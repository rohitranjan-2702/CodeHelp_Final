import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

function ProtectedRoutes() {
  const { isLoggedIn, userName } = useContext(LoginContext);
  const isAuthed = isLoggedIn && userName;

  return isAuthed ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
