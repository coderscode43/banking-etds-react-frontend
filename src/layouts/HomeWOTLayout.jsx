import HomeWOTSidebar from "@/components/navigation/HomeWOTSidebar";
import HomeWOTTopBar from "@/components/navigation/HomeWOTTopBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const HomeWOTLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBar = () => setSideBarOpen((prev) => !prev);
  return (
    <>
      <HomeWOTTopBar handleSideBar={handleSideBar} />
      <HomeWOTSidebar sideBarOpen={sideBarOpen} />
      <main
        className={`transition-all duration-300 ease-in-out ${sideBarOpen ? "mx-5 my-5 ml-[260px]" : "mx-10 my-5 ml-[104px]"}`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default HomeWOTLayout;
