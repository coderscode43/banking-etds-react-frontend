import { listData, WOTListData } from "@/service/apiService";

const common = {
  getListData: async (entity) => {
    return await listData(entity);
  },

  getWOTListData: async (entity, fy, branchCode) => {
    return await WOTListData(entity, fy, branchCode);
  },

  navigateBack: (navigate) => {
    navigate(-1);
  },
};

export default common;
