import {
  detailListData,
  detailRegularReturn,
  listData,
  WOTListData,
  paginationListData,
  paginationWithSearchListData,
} from "@/service/apiService";

const common = {
  getListData: async (entity) => {
    return await listData(entity);
  },

  getDetailListData: async (entity, fy, branchCode, id) => {
    return await detailListData(entity, fy, branchCode, id);
  },

  getDetailRegularReturn: async (entity, id) => {
    return await detailRegularReturn(entity, id);
  },

  getWOTListData: async (entity, fy, branchCode) => {
    return await WOTListData(entity, fy, branchCode);
  },

  getPagination: async (entity, pageNo) => {
    return await paginationListData(entity, pageNo - 1);
  },

  getPaginationWithSearch: async (entity, pageNo, searchParams) => {
    return await paginationWithSearchListData(entity, pageNo - 1, searchParams);
  },

  handleSearchInputChange: (e, setSearchParams) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  },

  getRefinedSearchParams: (searchParams) => {
    const refinedSearchParams = (obj) =>
      Object.fromEntries(
        Object.entries(obj).filter((entry) => {
          const value = entry[1];
          return value !== "" && value !== null && value !== undefined;
        })
      );

    return JSON.stringify(refinedSearchParams(searchParams));
  },

  getSearchListData: async (entity, pageNo, searchParams) => {
    const response = await paginationWithSearchListData(
      entity,
      pageNo,
      searchParams
    );

    return response;
  },
};

export default common;
