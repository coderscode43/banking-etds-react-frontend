import { useParams } from "react-router-dom";
import DropdownMenu from "../component/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { TooltipWrapper } from "../component/Tooltip";

const HomeWOTTopBar = ({ handleSideBar }) => {
  const { fy, branchCode } = useParams();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10">
      <header className="border-b-2 border-gray-300 bg-white">
        <div className="mx-10 flex h-14 items-center justify-between">
          <div className="flex items-center gap-10">
            <button onClick={handleSideBar}>
              <i className="fa-solid fa-bars cursor-pointer text-gray-400"></i>
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
