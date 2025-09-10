import { listData } from "@/service/apiService";

const common = {
  getListData: async (entity) => {
    return await listData(entity);
  },
};

export default common;
