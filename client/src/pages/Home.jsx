import React from "react";
import Carosel from "../components/Carosel";
import HomeAbout from "../components/HomeAbout";
import HomeCourse from "../components/HomeCourse";
import Anouncments from "../components/Anouncments";

const Home = () => {
  return (
    <>
      <Carosel />
      <HomeAbout />
      <HomeCourse />
      <Anouncments />
    </>
  );
};

export default Home;
