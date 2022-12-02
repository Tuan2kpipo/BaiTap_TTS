import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import LoginForm from "./compoents/public/Login";

const Protected = () => {
  const test = useSelector((state) => state);

  const getToken = () => {
    localStorage.getItem("token");
  };
  useEffect(() => {
    getToken();
  }, []);
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <LoginForm />;
};

export default Protected;
