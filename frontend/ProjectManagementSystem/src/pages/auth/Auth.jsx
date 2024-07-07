import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { Button } from "@/components/ui/button";
import "./Auth.css";

const Auth = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="loginContainer">
      <div className="box h-[30rem] w-[25rem] ">
        <div className="minContainer login">
          <div className="loginBox w-full px-10 space-y-5">
            {active ? <SignUp /> : <Login />}
            <div className="text-md">
              <span>already have account? </span>
              <Button variant="ghost" onClick={() => setActive(!active)}>
                {active ? "Login" : "Register"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
