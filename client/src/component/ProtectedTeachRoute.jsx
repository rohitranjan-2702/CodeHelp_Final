import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

function ProtectedTeachRoutes() {
  const { isLoggedIn, userName, userType } = useContext(LoginContext);
  const isAuthed = isLoggedIn && userName && userType === "tutor";

  return isAuthed ? <Outlet /> : <Navigate to="/tutor/login" />;
}

export default ProtectedTeachRoutes;
