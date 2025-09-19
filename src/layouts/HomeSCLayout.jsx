import HomeSCSidebar from "@/components/navigation/HomeSCSidebar";
import HomeSCTopBar from "@/components/navigation/HomeSCTopBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const HomeSClayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBar = () => setSideBarOpen((prev) => !prev);

  return (
    <>
      <HomeSCTopBar handleSideBar={handleSideBar} />
      <HomeSCSidebar sideBarOpen={sideBarOpen} />
      <main
        className={`${sideBarOpen ? "mx-5 my-5 ml-[260px]" : "mx-10 my-5 ml-[104px]"}`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default HomeSClayout;
