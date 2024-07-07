import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { store } from "@/redux/Store";
import { assignedUserToIssue } from "@/redux/issue/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({issueDetails}) => {

  const {project} = useSelector(store => store);
  const dispatch = useDispatch();

  const handleAssignIssueToUser = (userId) =>{
    dispatch(assignedUserToIssue({issueId: issueDetails.id, userId}));
  }

  return (
    <>
      <div className="space-y-2">
        <div className="border rounded-md">
            <p className="py-2 px-3">{issueDetails.assignee?.fullName || "Unassignee"}</p>
        </div>
        {
            project.projectDetails?.team.map((user) => <div onClick={() => handleAssignIssueToUser(user.id)} key={user} className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4 ">
            <Avatar>
                <AvatarFallback>{user.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <p className="text-sm leading-none">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">@{user.fullName.toLowerCase()}</p>
            </div>
        </div>)
        }
      </div>
    </>
  );
};

export default UserList;
