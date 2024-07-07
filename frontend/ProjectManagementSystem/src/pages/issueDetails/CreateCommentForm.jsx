import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import { createComment, fetchComments } from "@/redux/comment/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const CreateCommentForm = ({ issueId }) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(createComment({ content: data.content, issueId }));
    form.reset();
    console.log("Create comment data ", data);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex gap-2 items-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <div>
                    <Avatar>
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="w-[20rem]"
                      placeholder="add comment here..."
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="ghost" className="rounded-full h-12 bg-gray-800 bg-opacity-50">
            <PaperPlaneIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCommentForm;
