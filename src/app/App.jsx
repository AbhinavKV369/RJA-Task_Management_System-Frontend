import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ProtectedRoute from "../routes/ProtectedRoute";
import MainLayout from "../layout/mainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/admin"
            element={
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            }
          />
        </Route>

        {/* Employee */}
        <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
          <Route
            path="/employee"
            element={
              <MainLayout>
                <EmployeeDashboard />
              </MainLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
