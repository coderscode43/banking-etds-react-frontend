import { anyFileDownload } from "@/lib/utils";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL ?? "/";
axios.defaults.withCredentials = true;

// SC Layout API's
export const listData = async (entity) => {
  try {
    const response = await axios.get(`api${entity}/list/count/`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const detailListData = async (entity, fy, branchCode, id) => {
  try {
    const response = await axios.get(
      `api${entity}/detail/${fy}/${branchCode}/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const detailListDataSC = async (entity, id) => {
  try {
    const response = await axios.get(`api${entity}/detail/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// WOT Layout API's
export const WOTListData = async (entity, fy, branchCode) => {
  try {
    const response = await axios.get(
      `api${entity}/list/${fy}/${branchCode}/count/`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Pagination Functionality
export const paginationListData = async (entity, pageNo) => {
  try {
    const response = await axios.get(`api${entity}/list/get/${pageNo}/100`);
    return response;
  } catch (error) {
    console.error("Error in fetching entities:", error);
  }
};

export const paginationWithSearchListData = async (
  entity,
  pageNo,
  searchParams
) => {
  try {
    const response = await axios.get(
      `api${entity}/search/get/${pageNo}/100/${searchParams}`
    );
    return response;
  } catch (error) {
    console.error("Error in fetching search entities:", error);
  }
};

export const WOTSearchListData = async (
  entity,
  fy,
  branchCode,
  pageNo,
  searchParams
) => {
  try {
    const response = await axios.get(
      `api${entity}/search/${fy}/${branchCode}/${pageNo}/100/${searchParams}`
    );
    return response;
  } catch (error) {
    console.error("Error in fetching search entities:", error);
  }
};

export const addBulkRemark = async (entity, rowsData, enhancedFormData) => {
  const response = await axios.post(`api${entity}/addBulkRemark`, {
    ...rowsData,
    ...enhancedFormData,
  });
  return response;
};

export const generateExcel = async (entity, encodedParams) => {
  const response = await axios.get(
    `api${entity}/generateExcel/${encodedParams}`,
    {
      responseType: "blob",
    }
  );

  // Try to get filename from Content-Disposition
  let fileName = "export.xlsx";
  const cd = response.headers["content-disposition"];
  if (cd) {
    const match = cd.match(/filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i);
    if (match) fileName = decodeURIComponent(match[1] || match[2]);
  }

  const contentType =
    response.headers["content-type"] || "application/vnd.ms-excel";

  const blob = new Blob([response.data], { type: contentType });

  // IE/old Edge fallback
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
    return;
  }

  // Trigger browser download
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
};

export const sendReminder = async (entity, rowsData) => {
  const response = await axios.post(`api${entity}/sendReminder`, {
    ...rowsData,
  });
  return response;
};

export const submitEntity = async (entity, formData) => {
  const response = await axios.post(`api${entity}/add`, {
    ...formData,
  });
  return response;
};

export const updateEntity = async (entity, formData) => {
  const response = await axios.put(`api${entity}/update`, {
    ...formData,
  });
  return response;
};

export const deleteUserDetails = async (entity, employeeId) => {
  try {
    const response = await axios.delete(`api${entity}/delete/${employeeId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const submitWithFile = async (entity, formDataObj) => {
  const response = await axios.post(`api${entity}/addWithFile`, formDataObj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const submitWithFileRegularReturn = async (entity, formDataObj) => {
  const response = await axios.post(
    `api${entity}/addRegularReturnRO`,
    formDataObj,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const generateZipFile = async (entity, formdata) => {
  const { form, fy, quarter } = formdata;
  const response = await axios.get(
    `api${entity}/createBranchZip/${encodeURIComponent("ALL TAN")}/${form}/${fy}/${quarter}`,
    { ...formdata }
  );
  return response;
};

export const uploadCertificate = async (entity, formData) => {
  const response = await axios.post(`api${entity}/uploadZip`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const downloadFile = async (entity, id) => {
  const response = await axios.get(`api${entity}/downloadDoc/${id}`, {
    responseType: "blob",
    headers: { Accept: "*/*" },
  });

  anyFileDownload(response);
  return response;
};

export const generateReport = async (entity, formdata) => {
  const tan = formdata.tanNumber || " ";
  const typeOfForm = formdata.typeOfForm || " ";
  const fy = formdata.fy || " ";
  const quarter = formdata.quarter || " ";
  const typeOfReport = formdata.typeOfReport || " ";

  const response = await axios.get(
    `api${entity}/files/${tan}/${typeOfForm}/${fy}/${quarter}/${typeOfReport}`,
    {
      headers: {
        "Content-Type": "application/zip",
      },
      responseType: "blob",
    }
  );

  return response;
};

export const downloadCertificate = async (page, formdata) => {
  const tan = formdata.tanNumber || " ";
  const form = formdata.typeOfCertificate || " ";
  const fy = formdata.fy || " ";
  const quarter = formdata.quarter || " ";
  const pan = formdata.panNumber || " ";

  const response = await axios.get(
    `apidownloadCertificate/${page}/${tan}/${form}/${fy}/${quarter}/${pan}`,
    {
      headers: {
        "Content-Type": "application/zip",
      },
      responseType: "blob",
    }
  );

  return response;
};

export const updateDeductee = async (
  entity,
  remarkId,
  deducteeId,
  jsonData
) => {
  const response = await axios.put(
    `api${entity}/updateDeductee/${remarkId}/${deducteeId}`,
    jsonData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const rejectDeductee = async (
  entity,
  remarkId,
  deducteeId,
  formData,
  jsonData
) => {
  const response = await axios.put(
    `api${entity}/rejectDeductee/${remarkId}/${deducteeId}/${formData}`,
    jsonData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const downloadDocument = async (entity, id) => {
  const response = await axios.get(`api${entity}/downloadDoc/${id}`, {
    headers: {
      "Content-Type": "application/zip",
    },
    responseType: "blob",
  });
  anyFileDownload(response);
  return response;
};

export const addResponse = async (entity, refinedFormData) => {
  const response = await axios.post(`api${entity}/addRemark`, refinedFormData);
  return response;
};

export const addReponseWithFile = async (entity, formData) => {
  const response = await axios.post(
    `api${entity}/addRemarkWithDocument`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const searchDataCorrectionRequest = async (entity, jsonObj, pageNo) => {
  const response = await axios.get(
    `api${entity}/searchTable/get/${pageNo}/100/${jsonObj}`
  );
  return response;
};

export const submitCorrection = async (entity, entireFormData) => {
  const data = new FormData();
  if (entireFormData.cad !== undefined) {
    const supportingDocs = entireFormData?.docs;
    const challanSupportingDoc = entireFormData?.cad?.challanSupportingDoc;

    if (
      supportingDocs.length === 0 &&
      (challanSupportingDoc === null || challanSupportingDoc === undefined)
    ) {
      return await submitEntity(entity, entireFormData);
    } else {
      if (
        (supportingDocs.length !== 0 && challanSupportingDoc === null) ||
        challanSupportingDoc === undefined
      ) {
        for (let i = 0; i < supportingDocs.length; i++) {
          data.append("blob", supportingDocs[i].blob);
        }
        data.append("dec", JSON.stringify(entireFormData));

        const response = await axios.post(
          `api${entity}/addCorrection/singleFile`,
          data
        );
        return response;
      } else if (supportingDocs.length === 0 && challanSupportingDoc !== null) {
        data.append("blob", challanSupportingDoc);
        data.append("dec", JSON.stringify(entireFormData));

        const response = await axios.post(
          `api${entity}/addCorrection/singleFile`,
          data
        );
        return response;
      } else {
        for (let i = 0; i < supportingDocs.length; i++) {
          data.append("blob", supportingDocs[i].blob);
        }
        data.append("blob2", challanSupportingDoc);
        data.append("dec", JSON.stringify(entireFormData));

        const response = await axios.post(
          `api${entity}/addCorrection/multipleFile`,
          data
        );
        return response;
      }
    }
  }
};

export const authenticationStatus = async () => {
  const response = await axios.get(`apiAuth/getStatus`);
  return response;
};

export const signIn = async (urlEncodedData) => {
  const response = await axios.post(`/login`, urlEncodedData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
};

export const getStaticData = async () => {
  const response = await axios.get("/index/staticData");
  return response;
};
