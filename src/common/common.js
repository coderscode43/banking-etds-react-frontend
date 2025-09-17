import {
  detailListData,
  detailRegularReturn,
  listData,
  WOTListData,
  getCount,
  getEntity,
  fetchEntities,
  fetchSearchEntities,
} from "@/service/apiService";

const common = {
  currentPage: 1,
  srNo: 1,

  getListData: async (entity) => {
    return await listData(entity);
  },

  getCountData: function () {
    return getCount();
  },

  getEntityList: function () {
    return getEntity();
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
    await fetchEntities(entity, pageNo - 1);
  },

  getSearchPagination: async (entity, pageNo, searchParams) => {
    await fetchSearchEntities(entity, pageNo - 1, searchParams);
  },
};

export default common;
