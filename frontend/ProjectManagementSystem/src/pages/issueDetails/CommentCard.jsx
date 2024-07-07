import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteComment } from "@/redux/comment/Action";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";

const CommentCard = ({ comment }) => {

  const {toast} = useToast();
//   if (!comment || !comment.content.trim()) {
//     return null; // Skip rendering for invalid comments
//   }

  // const letter = comment?.user?.firstName ? comment?.user?.firstName[0] : ""
  // console.log(comment?.user?.firstName);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
    toast({
      variant: "destructive",
      title: "Comment deleted"
    })
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>{comment?.user.fullName[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p>{comment?.user.fullName}</p>
          <p>{comment?.content}</p>
        </div>
      </div>
      <Button
        onClick={handleDelete}
        className="rounded-full"
        variant="ghost"
        size="icon"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CommentCard;
