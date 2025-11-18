import { useEffect, useState } from "react";
import StaticDataContext from "./staticDataContext";
import { getStaticData } from "@/service/apiService";

const StaticDataProvider = ({ children }) => {
  const [staticData, setStaticData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        setLoading(true);
        const response = await getStaticData();
        setStaticData(response?.data || {});
      } catch (error) {
        console.error("Error fetching static data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticData();
  }, []);

  return (
    <StaticDataContext.Provider
      value={{ ...staticData, setStaticData, loading }}
    >
      {children}
    </StaticDataContext.Provider>
  );
};

export default StaticDataProvider;
