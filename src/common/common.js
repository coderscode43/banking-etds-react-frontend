import {
  addBulkRemark,
  detailListData,
  detailRegularReturn,
  listData,
  WOTListData,
  paginationListData,
  paginationWithSearchListData,
  WOTSearchListData,
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
        Object.entries(obj)
          .filter(
            (entry) =>
              entry[1] !== "" && entry[1] !== null && entry[1] !== undefined
          )
          .map(([key, value]) => {
            // If value matches YYYY-MM-DD format, convert to ISO string
            if (
              typeof value === "string" &&
              /^\d{4}-\d{2}-\d{2}$/.test(value)
            ) {
              return [key, new Date(value).toISOString()];
            }
            return [key, value];
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

  getWOTSearchListData: async (
    entity,
    fy,
    branchCode,
    pageNo,
    searchParams
  ) => {
    const response = await WOTSearchListData(
      entity,
      fy,
      branchCode,
      pageNo,
      searchParams
    );
    return response;
  },

  getAddBulk: async (entity, formdata) => {
    try {
      const response = await addBulkRemark(entity, formdata);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default common;
