import { useParams } from "react-router-dom";
import AllPagesSC from "./AllPagesSC";

const DynamicPageSC = () => {
  const { entity, searchParams } = useParams();
  const PageComponent = AllPagesSC[entity];
  const decodedData = searchParams
    ? JSON.parse(decodeURIComponent(searchParams))
    : null;

  // Render the component for the specific entity with decoded data
  return <PageComponent data={decodedData} />;
};

export default DynamicPageSC;
