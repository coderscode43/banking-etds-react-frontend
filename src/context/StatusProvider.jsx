import { useState } from "react";
import StatusContext from "./statusContext";

const StatusProvider = ({ children }) => {
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setSuccessModal(true);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setErrorModal(true);
  };

  return (
    <StatusContext.Provider
      value={{
        successModal,
        setSuccessModal,
        successMessage,
        errorModal,
        setErrorModal,
        errorMessage,
        showSuccess,
        showError,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
