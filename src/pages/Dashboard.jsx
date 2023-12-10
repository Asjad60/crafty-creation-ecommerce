import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[93vh] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.6rem)] ">
      <Sidebar />
      <div className="h-[calc(100vh-3.6rem)] flex-1 overflow-auto">
        <div className="mx-auto max-w-[1000px] w-11/12 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
