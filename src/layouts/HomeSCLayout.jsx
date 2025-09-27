import { useState } from "react";
import { Outlet } from "react-router-dom";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import HomeSCTopBar from "@/components/navigation/HomeSCTopBar";
import HomeSCSidebar from "@/components/navigation/HomeSCSidebar";

const HomeSClayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBar = () => setSideBarOpen((prev) => !prev);

  return (
    <>
      <HomeSCTopBar handleSideBar={handleSideBar} />
      <HomeSCSidebar sideBarOpen={sideBarOpen} />
      <SuccessModal />
      <ErrorModal />
      <main
        className={`transition-all duration-300 ease-in-out ${sideBarOpen ? "mx-5 my-5 ml-[260px]" : "mx-10 my-5 ml-[104px]"}`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default HomeSClayout;
