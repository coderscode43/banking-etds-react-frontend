import common from "@/common/common";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import { useContext } from "react";
import { TooltipWrapper } from "./Tooltip";

const GenerateExcelButton = ({
  entity,
  params,
  searchParams,
  branchCode,
  fy,
  layoutType,
}) => {
  const { showError } = useContext(statusContext);

  const handleGenerateExcel = async () => {
    if (layoutType === "sc") {
      try {
        if (params) {
          await common.getGenerateExcel(entity, params);
        } else {
          const refinedParams = common.getRefinedSearchParams(searchParams);
          await common.getGenerateExcel(entity, refinedParams);
        }
      } catch (error) {
        showError(errorMessage(error));
        console.log("Failed to download excel:", error);
      }
    } else if (layoutType === "wot") {
      let paramsObj = {
        branchCode: branchCode,
        fy: fy,
      };
      try {
        if (params) {
          const parsedParams = JSON.parse(params);
          console.log(parsedParams);

          paramsObj = {
            branchCode: branchCode,
            fy: fy,
            ...parsedParams,
          };
          console.log(paramsObj);
          const refinedParams = common.getRefinedSearchParams(paramsObj);
          await common.getGenerateExcel(entity, refinedParams);
        } else {
          const refinedParams = common.getRefinedSearchParams(paramsObj);
          await common.getGenerateExcel(entity, refinedParams);
        }
      } catch (error) {
        showError(errorMessage(error));
        console.log("Failed to download excel", error);
      }
    }
  };

  return (
    <TooltipWrapper tooltipText="Export to Excel">
      <button
        onClick={handleGenerateExcel}
        className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl text-white"
      >
        <i className="fa-solid fa-file-excel"></i>
      </button>
    </TooltipWrapper>
  );
};

export default GenerateExcelButton;
