import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "@/redux/project/Action";
import { useParams } from "react-router-dom";
import { store } from "@/redux/Store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectDetails = () => {
  const dispacth = useDispatch();
  const { project } = useSelector((store) => store);
  const { id } = useParams();

  const handleProjectInvitation = () => {};

  useEffect(() => {
    dispacth(fetchProjectById(id));
  }, [id]);

  return (
    <>
      <div className="mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen lg:w-[73%] pr-4">
            <div className="text-gray-400 pb-10 w-full">
              <h1 className="text-xl font-semibold pb-5">
                {project.projectDetails?.name}
              </h1>
              <div className="space-y-5 pb-10 text-sm">
                <p className="w-full md:max-w-lg lg:max-w-xl">
                  {project.projectDetails?.description}
                </p>
                <div className="flex">
                  <p className="w-36">Project Lead: </p>
                  <p>{project.projectDetails?.owner.fullName}</p>
                </div>
                <div className="flex">
                  <p className="w-36">Members: </p>
                  <div className="flex items-center gap-2">
                    {project.projectDetails?.team.map((item) => (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Avatar className="cursor-pointer" key={item}>
                              <AvatarFallback>
                                {item.fullName[0]}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm font-semibold">{item.fullName}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger>
                      {/* <DialogClose> */}
                      <Button
                        className="ml-2"
                        size="sm"
                        variant="outline"
                        onClick={handleProjectInvitation}
                      >
                        <span>Invite</span>
                        <PlusIcon className="w-4 h-4 font-extrabold" />
                      </Button>
                      {/* </DialogClose> */}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Invite New Projectmate</DialogHeader>
                      <InviteUserForm />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex">
                  <p className="w-36">Category:</p>
                  <p>{project.projectDetails?.category}</p>
                </div>
                <div className="flex">
                  <p className="w-36">Status:</p>
                  <Badge>{project.projectDetails?.status}</Badge>
                </div>
              </div>
              <section>
                <p className="py-5 border-b text-lg tracking-wider">Tasks</p>
                <div className="lg:flex md:flex gap-3 justify-between py-5">
                  <IssueList status="pending" title="Todo List" />
                  <IssueList status="in_progress" title="In Progress" />
                  <IssueList status="done" title="Done" />
                </div>
              </section>
            </div>
          </ScrollArea>
          <div className="lg:w-[27%] rounded-md sticky right-5 top-10">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;