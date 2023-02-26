import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

function ProtectedStudRoutes() {
  const { isLoggedIn, userName, userType } = useContext(LoginContext);
  const isAuthed = isLoggedIn && userName && userType === "user";

  return isAuthed ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedStudRoutes;
