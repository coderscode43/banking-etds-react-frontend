import { useParams } from "react-router-dom";
import DropdownMenu from "../component/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { TooltipWrapper } from "../component/Tooltip";

const HomeWOTTopBar = ({ isSidebarOpen, setSideBarOpen }) => {
  const { fy, branchCode } = useParams();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10">
      <header className="border-b-2 border-gray-300 bg-white">
        <div className="mx-10 flex h-14 items-center justify-between">
          <div className="flex items-center gap-10">
            <button onClick={() => setSideBarOpen((prev) => !prev)}>
              <span className="relative block h-5 w-5">
                <i
                  className={`fa-solid fa-bars absolute top-0 left-0 transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                      ? "scale-75 rotate-90 opacity-0"
                      : "scale-100 rotate-0 opacity-100"
                  }`}
                ></i>
                <i
                  className={`fa-solid fa-xmark absolute top-0 left-0 transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-75 -rotate-90 opacity-0"
                  }`}
                ></i>
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
            <h1 className="text-2xl text-[var(--primary-color)]">
              Financial Year : <span className="font-bold">{fy}</span>, Branch
              Code : <span className="font-bold">{branchCode}</span>
            </h1>
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

export default HomeWOTTopBar;
