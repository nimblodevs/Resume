import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); 
  const getUserData = async () => {
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }
    } catch (error) {
      console.log(error.message); 
    } finally {
      dispatch(setLoading(false)); 
    }
  };

  useEffect(() => {
    getUserData();
  }, [token, dispatch]); 

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public home page */}
        <Route path="/" element={<Home />} />

        {/* App section with layout wrapper */}
        <Route path="/app" element={<Layout />}>
          {/* Default route when visiting /app */}
          <Route index element={<Dashboard />} />

          {/* Resume builder page, dynamic resumeId */}
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        {/* Public preview page, accessible via shareable link */}
        <Route path="/view/:resumeId" element={<Preview />} />

        {/* Optional 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;
