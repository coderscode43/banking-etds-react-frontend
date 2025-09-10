import HomeWOTSidebar from "@/components/navigation/HomeWOTSidebar";
import HomeWOTTopBar from "@/components/navigation/HomeWOTTopBar";
import { Outlet } from "react-router-dom";

const HomeWOTLayout = () => {
  return (
    <>
      <HomeWOTTopBar />
      <HomeWOTSidebar />
      <main className="mx-10 my-5 ms-[104px]">
        <Outlet />
      </main>
    </>
  );
};

export default HomeWOTLayout;
