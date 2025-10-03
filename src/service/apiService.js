import axios from "axios";
import common from "@/common/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const credentials = {
  withCredentials: true,
};

// SC Layout API's
export const listData = async (entity) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/list/count/`,
      credentials
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const detailListData = async (entity, fy, branchCode, id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/detail/${fy}/${branchCode}/${id}`,
      credentials
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const detailListDataSC = async (entity, id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/detail/${id}`,
      credentials
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// WOT Layout API's
export const WOTListData = async (entity, fy, branchCode) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/list/${fy}/${branchCode}/count/`,
      credentials
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Pagination Functionality
export const paginationListData = async (entity, pageNo) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/list/get/${pageNo}/100`,
      credentials
    );
    return response;
  } catch (error) {
    console.error("Error in fetching entities:", error);
  }
};

export const paginationWithSearchListData = async (
  entity,
  pageNo,
  searchParams
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/search/get/${pageNo}/100/${searchParams}`,
      credentials
    );
    return response;
  } catch (error) {
    console.error("Error in fetching search entities:", error);
  }
};

export const WOTSearchListData = async (
  entity,
  fy,
  branchCode,
  pageNo,
  searchParams
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/search/${fy}/${branchCode}/${pageNo}/100/${searchParams}`,
      credentials
    );
    return response;
  } catch (error) {
    console.error("Error in fetching search entities:", error);
  }
};

export const addBulkRemark = async (entity, rowsData, enhancedFormData) => {
  const response = await axios.post(
    `${API_BASE_URL}${entity}/addBulkRemark`,
    {
      ...rowsData,
      ...enhancedFormData,
    },
    credentials
  );
  return response;
};

export const generateExcel = async (entity, encodedParams) => {
  try {
    // Axios GET with responseType 'blob' to get binary data
    const response = await axios.get(
      `${API_BASE_URL}${entity}/generateExcel/${encodedParams}`,
      {
        responseType: "blob",
        headers: { Accept: "application/vnd.ms-excel" },
        ...credentials,
      }
    );

    // Create blob object from response
    const blob = new Blob([response.data], {
      type: "application/vnd.ms-excel",
    });
    const downloadUrl = window.URL.createObjectURL(blob);

    // Try to extract filename from content-disposition header
    let filename = `TDS-${common.getTimeStamp()}-${entity.charAt(0).toUpperCase() + entity.slice(1)}.xlsx`; // Filename
    const disposition = response.headers["content-disposition"];
    if (disposition && disposition.indexOf("filename=") !== -1) {
      const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch.length === 2) {
        filename = filenameMatch[1];
      }
    }

    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Clean up DOM and revoke blob URL
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Failed to download Excel:", error);
  }
};

export const sendReminder = async (entity, rowsData) => {
  const response = await axios.post(
    `${API_BASE_URL}${entity}/sendReminder`,
    { ...rowsData },
    credentials
  );
  return response;
};

export const submitEntity = async (entity, formData) => {
  const response = await axios.post(
    `${API_BASE_URL}${entity}/add`,
    { ...formData },
    credentials
  );
  return response;
};

export const updateEntity = async (entity, formData) => {
  const response = await axios.put(
    `${API_BASE_URL}${entity}/update`,
    { ...formData },
    credentials
  );
  return response;
};

export const deleteUserDetails = async (entity, employeeId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${entity}/delete/${employeeId}`,
      {},
      credentials
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const submitWithFile = async (entity, formDataObj) => {
  const response = await axios.post(
    `${API_BASE_URL}${entity}/addWithFile`,
    formDataObj,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...credentials,
    }
  );
  return response;
};
