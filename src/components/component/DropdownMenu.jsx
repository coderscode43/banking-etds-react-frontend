import DynamicModal from "@/components/modals/DynamicModal";
import { useAuth } from "@/context/authContext";
import staticDataContext from "@/context/staticDataContext";
import { logout, signOut } from "@/service/apiService";
import { errorToast, successToast } from "@/toast/toast";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// Environment variable for login with SSOAuthServer
import { loginWithSSO } from "@/config/env";

const DropdownMenu = () => {
  const navigate = useNavigate();

  const { setAuthStatus } = useAuth();
  const { userDetails } = useContext(staticDataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    try {
      let response;
      if (loginWithSSO) {
        response = await logout();
      } else {
        response = await signOut();

        if (response?.headers["content-type"] === "application/json") {
          const newAuthStatus = { ...response.data };
          setAuthStatus(newAuthStatus);

          if (!newAuthStatus?.authenticated) {
            successToast("Logged out successfully !!");
            navigate("/sign-in", { replace: true });
          }
        } else {
          throw new Error("Error logging out !!");
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
      setIsModalOpen(false);
      if (!loginWithSSO) {
        if (error && typeof error === "object" && error?.response) {
          setAuthStatus(error?.response?.data);
        }
      } else {
        setAuthStatus({ status: "active", authenticated: true });
      }
      errorToast("Failed to log out !!");
    }
  };

  return (
    <>
      <Menu>
        <MenuButton className="align-middle outline-none">
          <img
            className="h-8 w-8 cursor-pointer"
            src="/images/user.png"
            alt="User Image"
          />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="z-10 w-40 origin-top-right rounded-md border border-gray-200 bg-white p-1 text-sm/6 text-gray-800 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 data-focus:bg-gray-100">
              <img
                className="h-6 w-6 cursor-pointer mix-blend-multiply"
                src="/images/user.png"
                alt="User Image"
              />
              <span>
                {userDetails?.userName.charAt(0).toUpperCase() +
                  userDetails?.userName.slice(1)}
              </span>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 data-focus:bg-gray-100"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                className="h-6 w-6 mix-blend-multiply"
                src="/images/signOut.png"
                alt="Sign Out Image"
              />
              <span>Log Out</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* Render the modal only when open */}
      {isModalOpen && (
        <DynamicModal
          title="Are you sure?"
          description="Do you want to logout !!!"
          isModalOpen={() => setIsModalOpen(true)}
          closeModal={closeModal}
          handler={handleLogout}
        />
      )}
    </>
  );
};

export default DropdownMenu;
