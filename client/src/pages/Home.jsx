import React from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../components/home/Banner";
import HeroSection from "../components/home/HeroSection";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";
import Login from "./Login";

const Home = () => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");

  // Show login/register form if state parameter is present
  if (state === "login" || state === "register") {
    return <Login />;
  }

  return (
    <div>
      <Banner />
      <HeroSection />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
