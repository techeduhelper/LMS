import React from "react";
import sec from "../assets/sec1.jpg";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";

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
      <div className='min-h-[50vh]'>
        <Outlet />
      </div>
      <div>
        <Footer />
        <Footer2 />
      </div>
    </>
  );
};

export default Layout;
