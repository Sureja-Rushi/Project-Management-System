import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "@/redux/issue/Action";
import { store } from "@/redux/Store";
import { fetchComments } from "@/redux/comment/Action";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issue, comment } = useSelector((store) => store);
  const [statusColor, setStatusColor] = useState("");


  console.log(issueId);

  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus({ id: issueId, status }));
    console.log(status);
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId, statusColor]);

  useEffect(() => {
    if (issue.issueDetails?.status === "done") {
      setStatusColor("bg-green-500");
    } else if (issue.issueDetails?.status === "in_progress") {
      setStatusColor("bg-yellow-500");
    } else {
      setStatusColor("bg-gray-400");
    }
  }, [issue.issueDetails?.status]);

  return (
    <div className="px-20 py-4 text-gray-400">
      <div className="flex justify-between border px-10 py-3 rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%]">
          <div>
            <h1 className="text-xl font-semibold text-gray-400">
              {issue.issueDetails?.title}
            </h1>

            <div className="py-5">
              <h2 className="font-semibold text-gray-400">Description</h2>
              <p className="text-gray-400 text-sm mt-3">
                {issue.issueDetails?.description}
              </p>
            </div>

            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>
              <Tabs defaultValue="comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  all make changes to your account here
                </TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-4">
                    {comment.comments.map((comment) => (
                      <CommentCard comment={comment} key={comment?.id} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  History change your password here
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full lg:w-[30%] space-y-2">
          <Select onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={issue.issueDetails?.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Assignee: </p>
                  {issue.issueDetails?.assignee?.fullName ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback>{issue.issueDetails?.assignee?.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <p>{issue.issueDetails?.assignee?.fullName}</p>
                    </div>
                  ) : (
                    <p>Unassigned</p>
                  )}
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Label: </p>
                  <p>None</p>
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Status: </p>
                  <Badge className={`${statusColor}`}>{issue.issueDetails?.status}</Badge>
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Release: </p>
                  <p>07/06/2024</p>
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Reporter: </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 text-xs">
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                    <p>Rushi Sureja</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
