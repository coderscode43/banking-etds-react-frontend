import {
  addBulkRemark,
  detailListData,
  listData,
  WOTListData,
  paginationListData,
  paginationWithSearchListData,
  sendReminder,
  submitEntity,
  deleteUserDetails,
  updateEntity,
  detailListDataSC,
  submitWithFile,
  generateZipFile,
  uploadCertificate,
  downloadFile,
  searchDataCorrectionRequest,
  submitWithFileRegularReturn,
  generateReport,
  downloadCertificate,
  updateDeductee,
  rejectDeductee,
  WOTSearchListData,
  generateExcel,
  downloadDocument,
  addReponseWithFile,
  addResponse,
  submitCorrection,
} from "@/service/apiService";

const common = {
  getListData: async (entity) => {
    return await listData(entity);
  },

  getDetailListData: async (entity, fy, branchCode, id) => {
    return await detailListData(entity, fy, branchCode, id);
  },

  getDetailListDataSC: async (entity, id) => {
    return await detailListDataSC(entity, id);
  },

  getWOTListData: async (entity, fy, branchCode) => {
    return await WOTListData(entity, fy, branchCode);
  },

  getPagination: async (entity, pageNo) => {
    return await paginationListData(entity, pageNo - 1);
  },

  getPaginationWithSearch: async (entity, pageNo, searchParams) => {
    return await paginationWithSearchListData(entity, pageNo - 1, searchParams);
  },

  handleSearchInputChange: (e, setSearchParams) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  },

  getRefinedSearchParams: (searchParams) => {
    const refinedSearchParams = (obj) =>
      Object.fromEntries(
        Object.entries(obj)
          .map(([key, value]) => {
            // Trim whitespace if value is a string
            if (typeof value === "string") {
              value = value.trim();
            }
            return [key, value];
          })
          .filter(
            (entry) =>
              entry[1] !== "" && entry[1] !== null && entry[1] !== undefined
          )
          .map(([key, value]) => {
            // If value matches YYYY-MM-DD format, convert to ISO string
            if (
              typeof value === "string" &&
              /^\d{4}-\d{2}-\d{2}$/.test(value)
            ) {
              return [key, new Date(value).toISOString()];
            }
            return [key, value];
          })
      );

    return JSON.stringify(refinedSearchParams(searchParams));
  },

  getRefinedObject: (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        (item) => item[1] !== "" && item[1] !== null && item[1] !== undefined
      )
    );
  },

  getSearchListData: async (entity, pageNo, searchParams) => {
    return await paginationWithSearchListData(entity, pageNo, searchParams);
  },

  getWOTSearchListData: async (
    entity,
    fy,
    branchCode,
    pageNo,
    searchParams
  ) => {
    return await WOTSearchListData(
      entity,
      fy,
      branchCode,
      pageNo,
      searchParams
    );
  },

  convertToDateObject: (dataObj) => {
    // Returns Date in this Format: Date Sun Aug 25 2024 00:00:00 GMT+0530 (India Standard Time)
    return Object.fromEntries(
      Object.entries(dataObj).map(([key, value]) => {
        // If value matches YYYY-MM-DD format, convert to actual Date object
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          const [year, month, day] = value.split("-").map(Number);
          return [key, new Date(year, month - 1, day)];
        }
        return [key, value];
      })
    );
  },

  getAddBulk: async (entity, rowsData, formdata) => {
    const enhancedFormData = common.convertToDateObject(
      common.getRefinedObject(formdata)
    );

    return await addBulkRemark(entity, rowsData, enhancedFormData);
  },

  getGenerateExcel: async (entity, refinedParams) => {
    const encodedParams = encodeURIComponent(refinedParams);
    return await generateExcel(entity, encodedParams);
  },

  getSendReminder: async (entity, rowsData) => {
    return await sendReminder(entity, rowsData);
  },

  getSubmit: async (entity, formData) => {
    return await submitEntity(entity, formData);
  },

  getUpdateData: async (entity, formData) => {
    return await updateEntity(entity, formData);
  },

  getDeleteUserDetails: async (entity, employeeId) => {
    return await deleteUserDetails(entity, employeeId);
  },

  getSubmitWithFile: async (entity, formDataObj) => {
    return await submitWithFile(entity, formDataObj);
  },

  getSubmitWithFileRR: async (entity, formDataObj) => {
    return await submitWithFileRegularReturn(entity, formDataObj);
  },

  getGenerateZipFile: async (entity, formData) => {
    return await generateZipFile(entity, formData);
  },

  getUploadCertificate: async (entity, formData) => {
    return await uploadCertificate(entity, formData);
  },

  getDownloadFile: async (entity, id) => {
    return await downloadFile(entity, id);
  },

  getGenerateReport: async (entity, formData) => {
    return await generateReport(entity, formData);
  },

  getDownloadCerticate: async (page, formData) => {
    return await downloadCertificate(page, formData);
  },

  getUpdateDeductee: async (entity, remarkId, deducteeId, jsonData) => {
    return await updateDeductee(entity, remarkId, deducteeId, jsonData);
  },

  getRejectDeductee: async (
    entity,
    remarkId,
    deducteeId,
    formData,
    jsonData
  ) => {
    return await rejectDeductee(
      entity,
      remarkId,
      deducteeId,
      formData,
      jsonData
    );
  },

  getDownloadDocument: async (entity, id) => {
    return await downloadDocument(entity, id);
  },

  getAddResponse: async (entity, formData, quarter) => {
    const refinedFormData = {
      ...formData,
      quarter: quarter,
    };
    return await addResponse(entity, refinedFormData);
  },

  getAddResponseWithFile: async (entity, formData) => {
    return await addReponseWithFile(entity, formData);
  },

  getSearchDataCorrectionRequest: async (entity, pageNo, formData) => {
    const tan = formData.tanOfCust;

    if (typeof tan === "undefined") {
      formData.tanOfCust = "";
    }

    const refinedFormData = {
      ...formData,
      quarter: Array.isArray(formData.quarter)
        ? formData.quarter.join(", ")
        : formData.quarter || "",
      typeOfCorrection: Array.isArray(formData.typeOfCorrection)
        ? formData.typeOfCorrection.join(", ")
        : formData.typeOfCorrection || "",
    };
    const jsonObj = common.getRefinedSearchParams(refinedFormData);

    const toc = refinedFormData.typeOfCorrection;

    let response;
    const excludedTocs = [
      "Others",
      "Exempted",
      "Add Entry/Challan",
      "Default Correction",
    ];

    if (!excludedTocs.includes(toc)) {
      response = await searchDataCorrectionRequest(entity, jsonObj, pageNo - 1);
    }

    return response || [];
  },

  getSubmitCorrection: async (
    entity,
    entireFormData,
    documents,
    modifiedRows
  ) => {
    let valid = true;
    const toc = entireFormData?.cd?.typeOfCorrection;
    const remark = entireFormData?.cad?.remark;

    if (typeof modifiedRows !== "undefined") {
      if (Array.isArray(modifiedRows) && modifiedRows.length === 0) {
        if (
          toc.includes("PAN Updation") ||
          toc.includes("Mismatch In TDS Amount") ||
          toc.includes("Mismatch In Gross Amount") ||
          toc.includes("Section Correction")
        ) {
          valid = false;
          throw new Error("Please select a row to add correction");
        } else if (
          modifiedRows == "addWithoutData" &&
          remark != undefined &&
          remark != ""
        ) {
          valid = true;
        } else {
          if (
            toc.includes("Add Entry/Challan") &&
            entireFormData?.cad?.challanSupportingDoc != undefined
          ) {
            valid = true;
          } else {
            if (toc.includes("Add Entry/Challan")) {
              valid = false;
              throw new Error("Please upload challan supporting document");
            }
          }
        }
      }
    } else {
      if (
        toc.includes("PAN Updation") ||
        toc.includes("Mismatch In TDS Amount") ||
        toc.includes("Mismatch In Gross Amount") ||
        toc.includes("Section Correction")
      ) {
        valid = false;
        throw new Error("Please select row to add correction");
      } else {
        if (
          toc.includes("Add Entry/Challan") &&
          entity?.cad?.challanSupportingDoc != undefined
        ) {
          valid = true;
        } else {
          if (toc.includes("Add Entry/Challan")) {
            valid = false;
            throw new Error("Please upload challan supporting document");
          }
        }
      }
    }

    if (valid === true) {
      if (modifiedRows !== "addWithoutData") {
        entireFormData.correctAmount = modifiedRows;
      }
      entireFormData.docs = documents;
      return await submitCorrection(entity, entireFormData);
    }
  },
};

export default common;
