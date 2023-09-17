import React from "react";
import sec from "../assets/sec1.jpg";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const styles = {
  checkAnimation: {
    width: "120%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex sm:flex-col lg:flex-row w-full justify-center ">
        <div className="flex -z-10 bg-contain items-center justify-center lg:w-2/3 sm:w-full">
          <lottie-player
            src="https://lottie.host/4f1aec90-d3a2-4f8f-bb86-97633b4b5a73/guQ15qnxVC.json"
            background="transparent"
            speed="1"
            style={styles.checkAnimation}
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="w-1/3 h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
