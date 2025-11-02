import { getApi, putApi, postApi, deleteApi, patchApi } from "./axios.js";

let resObj = {
  data: "",
  status: false,
  message: "",
  code: "",
};

export const ApiServices = {
  post: async (payload) => {
    await postApi(payload)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setErrorResponse(error);
      });
    return resObj;
  },

  get: async (url) => {
    await getApi(url)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setErrorResponse(error);
      });
    return resObj;
  },

  put: async (payload) => {
    await putApi(payload)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setErrorResponse(error);
      });
    return resObj;
  },

  patch: async (payload) => {
    await patchApi(payload)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setErrorResponse(error);
      });
    return resObj;
  },

  delete: async (payload) => {
    await deleteApi(payload)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setErrorResponse(error);
      });
    return resObj;
  },
};

const setResponse = (res) => {
  resObj.data = res?.data?.responseData;
  resObj.message = res?.data?.responseMessage;
  resObj.status = res?.data?.responseStatus;
  resObj.code = res?.data?.responseCode;
};

const setErrorResponse = (error) => {
  const res = error?.response;

  resObj.data = res?.data?.responseData;
  resObj.message = res?.data?.responseMessage || "Something went wrong";
  resObj.status = res?.data?.responseStatus || false;
  resObj.code = res?.data?.responseCode || "2";
};
