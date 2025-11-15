import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      {/* Public home page */}
      <Route path="/" element={<Home />} />

      {/* App section with layout wrapper */}
      {/* All nested routes render inside <Outlet /> inside Layout */}
      <Route path="/app" element={<Layout />}>
        {/* Default route when visiting /app */}
        <Route index element={<Dashboard />} />

        {/* Resume builder page, dynamic resumeId */}
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
      </Route>

      {/* Public preview page, accessible via shareable link */}
      <Route path="/view/:resumeId" element={<Preview />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Optional 404 page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
