import { useState } from "react";
import { Outlet } from "react-router-dom";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import HomeSCTopBar from "@/components/navigation/HomeSCTopBar";
import HomeSCSidebar from "@/components/navigation/HomeSCSidebar";
import WarningModal from "@/components/modals/WarningModal";

const HomeSClayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <HomeSCTopBar
        setSideBarOpen={setSideBarOpen}
        isSidebarOpen={sideBarOpen}
      />
      <HomeSCSidebar sideBarOpen={sideBarOpen} />
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

export default HomeSClayout;
