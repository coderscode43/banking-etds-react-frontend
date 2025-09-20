import { useParams } from "react-router-dom";
import AllPagesWOT from "./AllPagesWOT";

const DynamicPageWOT = () => {
  const { entity, searchParams } = useParams();
  const PageComponent = AllPagesWOT[entity];
  const decodedData = searchParams
    ? JSON.parse(decodeURIComponent(searchParams))
    : null;

  // Render the component for the specific entity with decoded data
  return <PageComponent data={decodedData} />;
};

export default DynamicPageWOT;
