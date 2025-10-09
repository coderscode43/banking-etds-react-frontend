import { useState } from "react";
import { Outlet } from "react-router-dom";
import HomeWOTSidebar from "@/components/navigation/HomeWOTSidebar";
import HomeWOTTopBar from "@/components/navigation/HomeWOTTopBar";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import WarningModal from "@/components/modals/WarningModal";

const HomeWOTLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBar = () => setSideBarOpen((prev) => !prev);
  return (
    <>
      <HomeWOTTopBar handleSideBar={handleSideBar} />
      <HomeWOTSidebar sideBarOpen={sideBarOpen} />
      <SuccessModal />
      <WarningModal />
      <ErrorModal />
      <main
        className={`transition-all duration-300 ease-in-out ${sideBarOpen ? "mx-5 my-5 ml-[260px]" : "mx-10 my-5 ml-[104px]"}`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default HomeWOTLayout;
