import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateComponent = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (token !== null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }

  // return token ? <Outlet /> : <Navigate to="/login" />
};

export default PrivateComponent;
