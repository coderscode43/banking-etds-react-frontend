import { X } from "lucide-react";
import { toast } from "sonner";

// Success Toast
const successToast = (message) => {
  const toastSuccess = toast.success(`${message}`, {
    style: { width: "250px", maxWidth: "90%" },
    duration: 2000,
    cancel: (
      <X
        size={13}
        className="absolute top-1 right-1 cursor-pointer text-green-600"
        onClick={() => toast.dismiss(toastSuccess)}
      />
    ),
  });
};

// Error Toast
const errorToast = (message) => {
  const toastError = toast.error(`${message}`, {
    style: { width: "250px", maxWidth: "90%" },
    duration: 2000,
    cancel: (
      <X
        size={13}
        className="absolute top-1 right-1 cursor-pointer text-red-600"
        onClick={() => toast.dismiss(toastError)}
      />
    ),
  });
};

export { successToast, errorToast };
