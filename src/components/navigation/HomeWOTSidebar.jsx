import React from "react";
import { useParams } from "react-router-dom";

const HomeWOTSidebar = () => {
  const { branchCode, fy } = useParams();

  const navItems = [
    {
      id: "downloadCertificate",
      label: "Download 16A/16/27D",
      page: "downloadCertificate",
      iconClass: "fa-solid fa-download",
      type: "wot",
    },
    {
      id: "form24QDeductee",
      label: "Form 24Q",
      page: "form24QDeductee",
      textIcon: "24Q",
      type: "listWOT",
    },
    {
      id: "form26QDeductee",
      label: "Form 26Q",
      page: "form26QDeductee",
      textIcon: "26Q",
      type: "listWOT",
    },
    {
      id: "form27EQDeductee",
      label: "Form 27EQ",
      page: "form27EQDeductee",
      textIcon: "27EQ",
      type: "listWOT",
    },
    {
      id: "form27QDeductee",
      label: "Form 27Q",
      page: "form27QDeductee",
      textIcon: "27Q",
      type: "listWOT",
    },
    {
      id: "correctionRequest",
      label: "Correction/Query Request",
      page: "correctionRequest",
      iconClass: "fa-solid fa-clipboard-user",
      type: "listWOT",
    },
    {
      id: "regularReturn",
      label: "Regular Return",
      page: "regularReturn",
      iconClass: "fa-solid fa-clipboard-check",
      type: "listWOT",
    },
    {
      id: "generateReport",
      label: "MIS Generate Report",
      page: "generateReport",
      iconClass: "fa-solid fa-clipboard-user",
      type: "wot",
    },
    {
      id: "back",
      label: "Back",
      page: "back",
      iconClass: "fa-solid fa-reply-all",
      type: "back",
    },
  ];
  return (
    <>
      <div className="fixed top-14 z-10 h-screen">
        <nav
          className="group transition-width flex h-full w-16 flex-col overflow-hidden rounded-r-md border border-t-2 border-l-0 border-gray-300 bg-white p-2.5 text-gray-500 duration-300 ease-in-out hover:w-60"
          style={{ transitionProperty: "width" }}
        >
          {/* Scrollable nav items */}
          <div className="hide-scrollbar flex-1 overflow-y-auto">
            <ul className="space-y-1 text-[15px]">
              {navItems.map(
                ({ id, label, page, iconClass, textIcon, type }) => {
                  return (
                    <li key={id}>
                      <a
                        href={
                          type === "wot"
                            ? `/homeWOT/${branchCode}/${fy}/${page}`
                            : `/homeWOT/${branchCode}/${fy}/list/${page}`
                        }
                        className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 whitespace-nowrap hover:bg-gray-100"
                      >
                        <div
                          className="w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:w-auto group-hover:opacity-100"
                          style={{
                            transitionProperty: "opacity, width, margin-left",
                          }}
                        >
                          {label}
                        </div>
                        <div>
                          {iconClass ? (
                            <i className={`${iconClass} text-center`}></i>
                          ) : (
                            <span className="text-center text-sm font-semibold">
                              {textIcon}
                            </span>
                          )}
                        </div>
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HomeWOTSidebar;
