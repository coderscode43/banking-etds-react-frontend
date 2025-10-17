import { useContext } from "react";
import statusContext from "@/context/statusContext";
import { OctagonAlert } from "lucide-react"; // use the right package here
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

const WarningModal = () => {
  const { warningModal, setWarningModal, warningMessage, warningTitle } =
    useContext(statusContext);

  useLockBodyScroll(warningModal);

  return (
    <div
      className={`bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
        warningModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="w-full max-w-[20rem] rounded-2xl bg-white px-4 pt-8 pb-6 shadow-xl transition-all">
        <div className="flex flex-col items-center justify-center gap-2">
          <OctagonAlert size={50} className="text-amber-500" />
          <p className="text-center text-2xl font-medium">
            {" "}
            {typeof errorMessage !== "object"
              ? warningTitle.charAt(0).toUpperCase() + warningTitle.slice(1)
              : warningTitle}
          </p>
        </div>
        <div className="relative pt-3 pb-6 text-center text-gray-600">
          <p>
            {typeof errorMessage !== "object"
              ? warningMessage.charAt(0).toUpperCase() + warningMessage.slice(1)
              : warningMessage}
          </p>
        </div>
        <div className="flex w-full justify-center rounded-b-md">
          <button
            onClick={() => setWarningModal(false)}
            className="mx-2 w-full cursor-pointer rounded-lg bg-amber-500 py-2 font-medium text-white hover:bg-[#ffa418]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
