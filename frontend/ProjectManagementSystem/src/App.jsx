import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./pages/navbar/Navbar";
import ProjectDetails from "./pages/projectDetails/ProjectDetails";
import IssueDetails from "./pages/issueDetails/IssueDetails";
import Subscription from "./pages/subscription/Subscription";
import Auth from "./pages/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./redux/Store";
import { useEffect } from "react";
import { getUser } from "./redux/Auth/Action";
import { fetchProjects } from "./redux/project/Action";
import UpgradeSuccess from "./pages/subscription/UpgradeSuccess";
import AcceptInvitation from "./pages/project/AcceptInvitation";
import { Toaster } from "./components/ui/toaster";

function App() {

  const dispatch = useDispatch();
  const {auth} = useSelector(store => store);

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProjects({}));
  }, [auth.jwt]);

  console.log(auth);

  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
            <Route path="/accept_invitation" element={<AcceptInvitation />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
      <Toaster />
    </>
  );
}

export default App;
