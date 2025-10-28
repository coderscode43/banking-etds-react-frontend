import { cn } from "@/lib/utils";

const ErrorMessage = ({ error, className }) => {
  if (!error) return null;
  return <p className={cn("mt-1 text-sm text-red-600", className)}>{error}</p>;
};
export default ErrorMessage;
