"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "@/graphql/client-generated";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const m = useLoginMutation(
    {
      endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetchParams: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
    {
      onError: (error: Error) => {
        toast.error("Login Failed", {
          description: error.message,
        });
      },
    }
  );

  function onSubmit(v: z.infer<typeof formSchema>) {
    m.mutate(
      {
        input: {
          email: v.email,
          password: v.password,
        },
      },
      {
        onSuccess: (data) => {
          Cookies.set("ACCESS_TOKEN", data.login, { path: "/" });
          toast.success("Login Success", {
            description: `Welcome ${v.email}`,
          });
          navigate("/note");
        },
      }
    );
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1 className="font-bold text-2xl">Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-1/5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">
            Login
          </Button>
        </form>
      </Form>
      <span>
        don't have an account?{" "}
        <Link className="text-blue-600" to={"/register"}>
          Register
        </Link>{" "}
        now!
      </span>
    </div>
  );
};

export default Login;
