import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import CreateProjectForm from "../project/CreateProjectForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/Store";
import { logout } from "@/redux/Auth/Action";

const Navbar = () => {


  const navigate = useNavigate();
  const {auth} = useSelector(store => store);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className="border-b py-3 px-4 items-center justify-between flex sticky">
      <div className="flex items-center gap-3">
        <p onClick={() => navigate("/")} className="cursor-pointer">Project Management</p>

        <Dialog>
          <DialogTrigger>
            <Button variant="ghost">New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Create New Project</DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>

        <Button onClick={() => navigate("/upgrade_plan")} variant="ghost">Upgrade</Button>
      </div>

      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="rounded-full border-2 border-gray-500" variant="outline" size="icon">
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout} >Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user?.fullName}</p>
      </div>
    </div>
  );
};

export default Navbar;
