import { ApiServices } from "../../http/httpServices";
import { MAX_DASHBOARD_CONTENT_LENGTH } from "../others/EnvConstant";

export const login = async (auth) => {
  const payload = {
    url: "auth/login",
    data: auth,
  };
  return await ApiServices.post(payload);
};

export const register = async (auth) => {
  const payload = {
    url: "auth/register",
    data: auth,
  };
  return await ApiServices.post(payload);
};

export const getProfile = async (
  page = 1,
  size = MAX_DASHBOARD_CONTENT_LENGTH
) => {
  return await ApiServices.get(`profile/properties?page=${page}&size=${size}`);
};
