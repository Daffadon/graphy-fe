import { useLoginMutation } from "@/graphql/client-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export const useLogin = () => {
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
  return {form, onSubmit}
};
