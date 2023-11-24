import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = ({ children }) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!auth) navigate("/");
  }, []);
  return <>{children}</>;
};

export default Private;
