import React from "react";

const HomeWOTSidebar = () => {
  const navItems = [
    {
      id: "downloadCertificate",
      label: "Download 16A/16/27D",
      page: "downloadCertificate",
      iconClass: "fa-solid fa-download",
    },
    {
      id: "form24QDeductee",
      label: "Form 24Q",
      page: "form24QDeductee",
      textIcon: "24Q",
    },
    {
      id: "form26QDeductee",
      label: "Form 26Q",
      page: "form26QDeductee",
      textIcon: "26Q",
    },
    {
      id: "form27EQDeductee",
      label: "Form 27EQ",
      page: "form27EQDeductee",
      textIcon: "27EQ",
    },
    {
      id: "form27QDeductee",
      label: "Form 27Q",
      page: "form27QDeductee",
      textIcon: "27Q",
    },
    {
      id: "correctionRequest",
      label: "Correction/Query Request",
      page: "correctionRequest",
      iconClass: "fa-solid fa-clipboard-user",
    },
    {
      id: "regularReturn",
      label: "Regular Return",
      page: "regularReturn",
      iconClass: "fa-solid fa-clipboard-check",
    },
    {
      id: "generateReport",
      label: "MIS Generate Report",
      page: "generateReport",
      iconClass: "fa-solid fa-clipboard-user",
    },
    {
      id: "",
      label: "Back",
      page: "",
      iconClass: "fa-solid fa-reply-all",
    },
  ];
  return (
    <>
      <div className="absolute top-0 z-10 h-screen">
        <nav
          className="group transition-width flex h-full w-16 flex-col overflow-hidden border-r border-gray-300 bg-white p-4 pb-8 text-gray-500 duration-300 ease-in-out hover:w-60"
          style={{ transitionProperty: "width" }}
        >
          {/* Logo Section */}
          <div className="mb-4 flex items-center justify-center gap-5">
            {/* Hide TOS when collapsed, show on expand */}
            <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <img
                className="h-10 object-contain"
                src="/images/TOS-TRANSPARENT.png"
                alt="TOS Logo"
              />
            </div>

            {/* ROBO logo always visible */}
            <img
              className="h-10 object-contain"
              src="/images/ROBO-TRANSPARENT.png"
              alt="ROBO Logo"
            />
          </div>

          {/* Scrollable nav items */}
          <div className="hide-scrollbar flex-1 overflow-y-auto">
            <ul className="space-y-3 text-[15px]">
              {navItems.map(({ id, label, page, iconClass, textIcon }) => {
                return (
                  <li
                    key={id}
                    className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 whitespace-nowrap hover:bg-gray-100"
                  >
                    {/* Label: only show when sidebar is expanded */}
                    <a
                      href={page}
                      className="w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:w-auto group-hover:opacity-100"
                      style={{
                        transitionProperty: "opacity, width, margin-left",
                      }}
                    >
                      {label}
                    </a>

                    {iconClass ? (
                      <i className={`${iconClass} text-center`}></i>
                    ) : (
                      <span className="text-center text-sm font-semibold">
                        {textIcon}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HomeWOTSidebar;
