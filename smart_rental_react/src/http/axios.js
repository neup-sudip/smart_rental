import axios from "axios";

export const instance = axios.create({
  baseURL: "/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const deleteApi = (url) => instance.delete(url);
export const getApi = (url) => instance.get(url);
export const putApi = ({ url, data }) => instance.put(url, data);
export const postApi = ({ url, data }) => instance.post(url, data);
export const patchApi = ({ url, data }) => instance.patch(url, data);
