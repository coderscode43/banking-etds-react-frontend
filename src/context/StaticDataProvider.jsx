import axios from "axios";
import { useEffect, useState } from "react";
import StaticDataContext from "./staticDataContext";

// Set base URL and withCredentials globally
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL ?? "/";
axios.defaults.withCredentials = true;

const StaticDataProvider = ({ children }) => {
  const [staticData, setStaticData] = useState({});

  useEffect(() => {
    const getStaticData = async () => {
      try {
        const response = await axios.get("/index/staticData");
        setStaticData(response.data || {});
      } catch (error) {
        console.error("Error fetching static data:", error);
      }
    };

    getStaticData();
  }, []);

  return (
    <StaticDataContext.Provider value={staticData}>
      {children}
    </StaticDataContext.Provider>
  );
};

export default StaticDataProvider;
