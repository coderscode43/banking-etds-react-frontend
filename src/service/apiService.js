import axios from "axios";

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
  const url = `${API_BASE_URL}${entity}/generateExcel/${encodedParams}`;

  // Credentials should be your axios config (headers, withCredentials, etc.)
  const res = await axios.get(url, {
    ...(credentials || {}),
    responseType: "blob",
  });

  // Try to get filename from Content-Disposition
  let fileName = "export.xlsx";
  const cd = res.headers["content-disposition"];
  if (cd) {
    const match = cd.match(/filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i);
    if (match) fileName = decodeURIComponent(match[1] || match[2]);
  }

  const contentType = res.headers["content-type"] || "application/vnd.ms-excel";

  const blob = new Blob([res.data], { type: contentType });

  // IE/old Edge fallback
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
    return;
  }

  // Trigger browser download
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
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
    const response = await axios.delete(
      `${API_BASE_URL}${entity}/delete/${employeeId}`,
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
