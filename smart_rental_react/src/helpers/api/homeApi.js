import { ApiServices } from "../../http/httpServices";

export const getDashboard = async () => {
  return await ApiServices.get(`dashboard`);
};

export const getLocationsCategories = async () => {
  return await ApiServices.get("info");
};
