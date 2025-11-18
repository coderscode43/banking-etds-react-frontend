import { useNavigate } from "react-router-dom";
import DropdownMenu from "../component/DropdownMenu";
import { TooltipWrapper } from "../component/Tooltip";
import staticDataContext from "@/context/staticDataContext";
import { useContext } from "react";
import { Menu, X } from "lucide-react";
import TextLoadingSkeleton from "../loader/TextLoadingSkeleton";

const HomeSCTopBar = ({ isSidebarOpen, setSideBarOpen }) => {
  const navigate = useNavigate();
  const { clientDetails, loading } = useContext(staticDataContext);

  return (
    <div className="sticky top-0 z-10">
      <header className="border-b-2 border-gray-300 bg-white">
        <div className="mx-10 flex h-14 items-center justify-between">
          <div className="flex items-center gap-10">
            <button onClick={() => setSideBarOpen((prev) => !prev)}>
              <span className="relative block h-5 w-5">
                <Menu
                  className={`absolute top-0 left-0 cursor-pointer text-gray-400 transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                      ? "scale-75 rotate-90 opacity-0"
                      : "scale-100 rotate-0 opacity-100"
                  }`}
                  size={19}
                  strokeWidth={2.5}
                />
                <X
                  className={`absolute top-0 left-0 cursor-pointer text-gray-400 transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-75 -rotate-90 opacity-0"
                  }`}
                  size={19}
                  strokeWidth={2.5}
                />
              </span>
            </button>
            <div>
              <img
                className="h-10 cursor-pointer object-contain"
                src="/images/TOS-TRANSPARENT.png"
                alt="TOS Logo"
                onClick={() => navigate(`homepage`)}
              />
            </div>
          </div>
          <div className="mr-[90px]">
            {loading ? (
              <TextLoadingSkeleton width={480} height={32} />
            ) : clientDetails ? (
              <h1 className="text-2xl font-bold text-[var(--primary-color)]">
                {clientDetails?.ClientName} - {clientDetails?.ClientPAN}
              </h1>
            ) : (
              <h1 className="text-2xl font-bold text-[var(--primary-color)]">
                No Client Details Available
              </h1>
            )}
          </div>
          <div className="flex items-center justify-center gap-5">
            <div>
              <TooltipWrapper tooltipText={"Refresh"}>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="cursor-pointer rounded-md bg-[#12a4ed] px-2 py-1.5 text-sm text-white"
                >
                  Refresh
                </button>
              </TooltipWrapper>
            </div>
            <div>
              <DropdownMenu />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomeSCTopBar;
