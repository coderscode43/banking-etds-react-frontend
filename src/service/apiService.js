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

export const detailRegularReturn = async (entity, id) => {
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

// http://localhost:8080/apiregularReturnRemark/addBulkRemark
export const addBulkRemark = async (entity, formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${entity}/addBulkRemark`,
      formData,
      credentials
    );
    return response;
  } catch (error) {
    console.error("Error Fetching the excel", error);
  }
};
