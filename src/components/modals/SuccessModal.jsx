import statusContext from "@/context/statusContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = () => {
  const { successModal, setSuccessModal, successMessage, redirectPath } =
    useContext(statusContext);

  const navigate = useNavigate();

  return (
    <div
      className={`bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
        successModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="relative w-full max-w-[17rem] rounded-2xl bg-white px-4 pt-8 pb-6 shadow-xl transition-all">
        {/* Header with image */}
        <div className="flex flex-col items-center justify-center gap-2">
          <i className="fa-solid fa-circle-check text-5xl text-green-600"></i>
          <p className="text-2xl font-medium">Success</p>
        </div>

        {/* Success message */}
        <div className="relative pt-3 pb-6 text-center text-black">
          {successMessage}
        </div>

        {/* Footer */}
        <div className="flex w-full justify-center rounded-b-md">
          <button
            onClick={() => {
              setSuccessModal(false);
              if (redirectPath) {
                navigate(redirectPath);
              } else {
                window.location.reload();
              }
            }}
            className="mx-2 w-full cursor-pointer rounded-lg bg-green-600 py-2 font-medium text-white hover:bg-green-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
