import React from "react";
import Banner from "../components/home/Banner";
import HeroSection from "../components/home/HeroSection";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";

const Home = () => {
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
