import React from "react";
import sec from "../assets/sec1.jpg";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Header2 from "../components/Header2";

const styles = {
  checkAnimation: {
    width: "120%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};

const Layout = () => {
  return (
    <>
      <Header2 />
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
