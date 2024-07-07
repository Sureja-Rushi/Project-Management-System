import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatBubbleIcon, DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteIssue } from "@/redux/issue/Action";

const IssueCard = ({issue, projectId}) => {

  const navigate = useNavigate();
  const dispacth = useDispatch();

  const handleIssueDelete = () => {
    dispacth(deleteIssue(issue.id));
  }

  return (
    <div>
      <Card className="rounded-md py-1 pb-2">
        <CardHeader className="py-0 pb-1">
          <div className="flex justify-between items-center">
            <CardTitle className="cursor-pointer" onClick={() => navigate(`/project/${projectId}/issue/${issue.id}`)} >{issue.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuItem>In progress</DropdownMenuItem>
                <DropdownMenuItem>Done</DropdownMenuItem> */}
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleIssueDelete}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="py-0">
          <div className="flex items-center justify-between">
            <p>FBP - {1}</p>
            <DropdownMenu className="w-[30rem] border border-red-400 ">
              <DropdownMenuTrigger>
                <Button size="icon" className="bg-gray-900 hover:text-black text-white rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      {issue.assignee ? issue.assignee.fullName[0] : <PersonIcon />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <UserList issueDetails={issue} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueCard;
