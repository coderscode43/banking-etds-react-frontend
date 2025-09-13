import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const credentials = {
  withCredentials: true,
};

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
