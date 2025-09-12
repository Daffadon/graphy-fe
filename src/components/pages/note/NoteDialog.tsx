import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface INoteDialog {
  noteid?: string;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const NoteDialog = ({ noteid, open, setOpen }: INoteDialog) => {
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
            if (setOpen) {
              setOpen(false);
            }
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
          if (setOpen) {
            setOpen(false);
          }
          form.reset();
        },
      }
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          if (setOpen) {
            setOpen(false);
          }
          form.reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <DialogHeader>
              <DialogTitle>Note</DialogTitle>
              <DialogDescription>
                {noteid
                  ? "Update your notes and save it"
                  : "Make your own note and save it for yourself. simple and easy."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name={"title"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"description"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="resize-none min-h-18 max-h-18 no-scrollbar"
                        />
                      </FormControl>
                      <FormMessage />{" "}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"content"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Content"
                          {...field}
                          className="resize-none min-h-52 max-h-52 no-scrollbar"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer">
                  {noteid ? "Update" : "Save Note"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
