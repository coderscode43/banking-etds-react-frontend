import { useState } from "react";
import { NavLink } from "react-router-dom";
import DynamicModal from "@/components/modals/DynamicModal";

const navItems = [
  {
    id: "branch",
    label: "Select RO",
    page: "branch",
    iconClass: "fa-solid fa-address-book",
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
    id: "challan",
    label: "Challan",
    page: "challan",
    iconClass: "fa-solid fa-receipt",
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    page: "totalAmount",
    iconClass: "fa-solid fa-wallet",
  },
  {
    id: "panUpdateList",
    label: "PAN Update List",
    page: "panUpdateList",
    iconClass: "fa-solid fa-clipboard-list",
  },
  {
    id: "statementStatus",
    label: "Statement Status",
    page: "statementStatus",
    iconClass: "fa-solid fa-clock",
  },
  {
    id: "deductorDetails",
    label: "Deductor Details",
    page: "deductorDetails",
    iconClass: "fa-solid fa-credit-card",
  },
  {
    id: "correctionRequest",
    label: "Correction Request",
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
    id: "uploadCertificate",
    label: "Upload Certificate",
    page: "uploadCertificate",
    iconClass: "fa-solid fa-file-arrow-up",
  },
  {
    id: "ldc",
    label: "LDC Details",
    page: "ldc",
    iconClass: "fa-solid fa-file",
  },
  {
    id: "userDetails",
    label: "Users",
    page: "userDetails",
    iconClass: "fa-solid fa-users",
  },
  {
    id: "logs",
    label: "Logs",
    page: "logs",
    iconClass: "fa-solid fa-clock-rotate-left",
  },
  {
    id: "logout",
    label: "Logout",
    page: "",
    iconClass: "fa-solid fa-power-off",
  },
];

const HomeSCSidebar = ({ sideBarOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="fixed top-14 z-10 h-screen">
        <nav
          className={`${sideBarOpen ? "w-60" : "w-16"} group transition-width flex h-[91%] w-16 flex-col overflow-hidden rounded-r-md border border-t-2 border-l-0 border-gray-300 bg-white p-2.5 text-gray-500 duration-300 ease-in-out hover:w-60`}
          style={{ transitionProperty: "width" }}
        >
          {/* Scrollable nav items */}
          <div className="hide-scrollbar flex-1 overflow-y-auto">
            <ul className="space-y-1 text-[15px]">
              {navItems.map(({ id, label, page, iconClass, textIcon }) => {
                return (
                  <li key={id}>
                    <NavLink
                      to={id === "logout" ? "" : `/home/list/${page}`}
                      onClick={(e) => {
                        if (id === "logout") {
                          e.preventDefault();
                          setIsModalOpen(true);
                        }
                      }}
                      className={({ isActive }) =>
                        [
                          `flex cursor-pointer items-center rounded-md px-2 py-2 whitespace-nowrap group-hover:justify-between hover:bg-gray-100 ${sideBarOpen ? "justify-between" : "justify-center"} `,
                          // only apply active styling if not logout
                          isActive && id !== "logout"
                            ? "bg-blue-100 font-medium text-blue-500"
                            : "",
                        ].join(" ")
                      }
                    >
                      <div
                        className={`w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:w-auto group-hover:opacity-100 ${sideBarOpen ? "ml-2 w-auto opacity-100" : " "}`}
                        style={{
                          transitionProperty: "opacity, width, margin-left",
                        }}
                      >
                        {label}
                      </div>
                      <div>
                        {iconClass ? (
                          <i
                            className={`${iconClass} w-[26px] text-center`}
                          ></i>
                        ) : (
                          <span className="text-center text-sm font-semibold">
                            {textIcon}
                          </span>
                        )}
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Render the modal only when open */}
      {isModalOpen && (
        <DynamicModal
          title="Are you sure?"
          description="Do you want to logout !!!"
          isModalOpen={() => setIsModalOpen(true)}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default HomeSCSidebar;
