import { useEffect, useState } from "react";
import StaticDataContext from "./staticDataContext";
import { getStaticData } from "@/service/apiService";

const StaticDataProvider = ({ children }) => {
  const [staticData, setStaticData] = useState({});

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const response = await getStaticData();
        setStaticData(response?.data || {});
      } catch (error) {
        console.error("Error fetching static data:", error);
      }
    };

    fetchStaticData();
  }, []);

  return (
    <StaticDataContext.Provider value={{ ...staticData, setStaticData }}>
      {children}
    </StaticDataContext.Provider>
  );
};

export default StaticDataProvider;
