import {
  useCreateNoteMutation,
  useNoteQuery,
  useUpdateNoteMutation,
} from "@/graphql/client-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, type Dispatch } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const useNoteDialog = (
  noteid: string | undefined,
  setOpen: Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const token = Cookies.get("ACCESS_TOKEN");
  const shouldFetch = typeof noteid === "string" && noteid.length > 0;
  const { data } = useNoteQuery(
    {
      endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetchParams: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    },
    { id: noteid ?? "" },
    {
      enabled: shouldFetch,
      staleTime: 1000 * 60 * 5,
      queryKey: ["Note", noteid],
    }
  );

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    content: z.string().min(1, { message: "Content is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.note?.title ?? "",
      description: data?.note?.description ?? "",
      content: data?.note?.text ?? "",
    },
  });

  const createMutation = useCreateNoteMutation(
    {
      endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetchParams: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    },
    {
      onError: (error: Error) => {
        toast.error("Create Note Error", {
          description: error.message,
        });
      },
    }
  );

  const updateMutation = useUpdateNoteMutation(
    {
      endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetchParams: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    },
    {
      onError: (error: Error) => {
        toast.error("Update Note Error", {
          description: error.message,
        });
      },
    }
  );

  useEffect(() => {
    if (data?.note) {
      form.reset({
        title: data.note.title ?? "",
        description: data.note.description ?? "",
        content: data.note.text ?? "",
      });
    }
  }, [data?.note, form]);

  function onSubmit(v: z.infer<typeof formSchema>) {
    if (noteid) {
      updateMutation.mutate(
        {
          input: {
            noteid: noteid,
            description: v.description,
            text: v.content,
            title: v.title,
          },
        },
        {
          onSuccess: () => {
            toast.success("Success", {
              description: `${v.title} updated`,
            });
            queryClient.invalidateQueries({ queryKey: ["Notes"] });
            setOpen(false);
            form.reset();
          },
        }
      );
      return;
    }
    createMutation.mutate(
      {
        input: {
          description: v.description,
          text: v.content,
          title: v.title,
        },
      },
      {
        onSuccess: () => {
          toast.success("Success", {
            description: `${v.title} Created`,
          });
          queryClient.invalidateQueries({ queryKey: ["Notes"] });
          setOpen(false);
          form.reset();
        },
      }
    );
  }
  return { form, onSubmit };
};
