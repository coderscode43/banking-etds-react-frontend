import DropdownMenu from "../component/DropdownMenu";

const HomeWOTTopBar = () => {
  return (
    <div className="sticky top-0 z-10">
      <header className="border-b-2 border-gray-300 bg-white">
        <div className="mx-10 flex h-14 items-center justify-between">
          <div className="flex items-center gap-10">
            <button type="button">
              <i className="fa-solid fa-bars cursor-pointer text-gray-400"></i>
            </button>
            <div>
              <img
                className="h-10 object-contain"
                src="/images/TOS-TRANSPARENT.png"
                alt="TOS Logo"
              />
            </div>
          </div>
          <div className="mr-[90px]">
            <h1 className="text-2xl text-[var(--primary-color)]">
              Financial Year : <span className="font-bold">2025-26</span>,
              Branch Code : <span className="font-bold">1000</span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div>
              <button className="cursor-pointer rounded-md bg-[#12a4ed] px-2 py-1.5 text-sm text-white">
                Refresh
              </button>
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
