import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let count = 0;
let entityList = [];

export function getCount() {
  return count;
}

export function getEntity() {
  return entityList;
}

//Pagination Function
export async function fetchEntities(entity, pageNo) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/list/get/${pageNo}/100`,
      { withCredentials: true }
    );
    count = response.data.count || 0;
    entityList = response.data.entities || ([] && response.data);
    return response;
  } catch (error) {
    console.error("Error in fetchEntities:", error);
    throw error;
  }
}

export async function fetchSearchEntities(entity, pageNo, searchParams) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${entity}/search/get/${pageNo}/100/${searchParams}`,
      { withCredentials: true }
    );
    count = response.data.count || 0;
    entityList = response.data.entities || ([] && response.data);
  } catch (error) {
    console.error("Error in fetchSearchEntities:", error);
    throw error;
  }
}

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
    count = response.data.count || 0;
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
