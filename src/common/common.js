import {
  addBulkRemark,
  detailListData,
  detailRegularReturn,
  listData,
  WOTListData,
  paginationListData,
  paginationWithSearchListData,
  WOTSearchListData,
  generateExcel,
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
          .map(([key, value]) => {
            // Trim whitespace if value is a string
            if (typeof value === "string") {
              value = value.trim();
            }
            return [key, value];
          })
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

  // Generate Timestamp string like dd_MM_yyyy_HH_mm_ss
  getTimeStamp: () => {
    const now = new Date();

    const pad = (num) => num.toString().padStart(2, "0");

    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1); // months are zero-based
    const year = now.getFullYear();

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${day}_${month}_${year}_${hours}_${minutes}_${seconds}`;
  },

  getSearchListData: async (entity, pageNo, searchParams) => {
    return await paginationWithSearchListData(entity, pageNo, searchParams);
  },

  getWOTSearchListData: async (
    entity,
    fy,
    branchCode,
    pageNo,
    searchParams
  ) => {
    return await WOTSearchListData(
      entity,
      fy,
      branchCode,
      pageNo,
      searchParams
    );
  },

  getAddBulk: async (entity, formdata) => {
    try {
      const response = await addBulkRemark(entity, formdata);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getGenerateExcel: async (entity, refinedParams) => {
    const encodedParams = encodeURIComponent(refinedParams);
    return await generateExcel(entity, encodedParams);
  },
};

export default common;
