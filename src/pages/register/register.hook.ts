import { useCreateUserMutation } from "@/graphql/client-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export const useRegister = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.email({ message: "Invalid email address." }),
    fullname: z.string().min(2, {
      message: "fullname must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullname: "",
      password: "",
    },
  });

  const m = useCreateUserMutation(
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
        toast.error("Register Failed", {
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
          fullname: v.fullname,
          password: v.password,
        },
      },
      {
        onSuccess: () => {
          toast.success("Register Successful", {
            description: "Your account has been created.",
          });
          navigate("/login");
        },
      }
    );
  }
  return { form, onSubmit };
};
