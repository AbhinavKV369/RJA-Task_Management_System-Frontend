import React from "react";
import AuthProvider from "../context/auth/AuthProvider";
import TaskProvider from "../context/task/TaskProvider";

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <TaskProvider> {children}</TaskProvider>
    </AuthProvider>
  );
};

export default Provider;
