import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const errorMessage = (error, fallback = "An error occurred") => {
  return (
    error?.response?.data?.exceptionMsg ||
    error?.response?.data?.message ||
    error?.response?.data?.text() ||
    error?.message ||
    fallback
  );
};
// DD-MM-YYYY HH:MM:SS -> 11-10-2025 14:45:30
export const dateWithTime = (d) => {
  if (!d) return "";
  const date = new Date(d);
  const pad = (n) => String(n).padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

// 26-06-2025
export const date = (d) =>
  !d ? "" : new Date(d).toLocaleDateString("en-GB").replace(/\//g, "-");

// Regex for PAN: exactly 5 uppercase letters + 4 digits + 1 uppercase letter
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const zipDownload = (response) => {
  // Create a download URL from the blob
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  // Optionally get filename from headers (if backend sends Content-Disposition header)
  const disposition = response.headers["content-disposition"];
  let fileName = "report.zip"; // default to .zip or .xlsx as per your report type
  if (disposition && disposition.indexOf("filename=") !== -1) {
    fileName = disposition
      .split("filename=")[1]
      .split(";")[0]
      .replace(/"/g, "");
  }

  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  // cleanup URL
  window.URL.revokeObjectURL(url);
};

export const statusFormatter = (value, invert = false) => {
  const isResolved =
    typeof value === "string"
      ? value.toLowerCase() === "true" || value.toLowerCase() === "resolved"
      : value === true;
  return invert
    ? isResolved
      ? "Pending"
      : "Resolved"
    : isResolved
      ? "Resolved"
      : "Pending";
};
