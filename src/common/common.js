import { listData } from "@/service/apiService";

const common = {
  getListData: async (entity) => {
    return await listData(entity);
  },

  navigateBack: (navigate) => {
    navigate(-1);
  },
};

export default common;
