import { ApiServices } from "../../http/httpServices";
import { MAX_DASHBOARD_CONTENT_LENGTH } from "../others/EnvConstant";

export const getPropertyList = async (
  page = 1,
  size = MAX_DASHBOARD_CONTENT_LENGTH,
  text,
  location,
  category
) => {
  return await ApiServices.get(
    `properties/list?page=${page}&size=${size}&text=${text}&location=${location}&category=${category}`
  );
};

export const getPropertyDetails = async (propertyId) => {
  return await ApiServices.get(`properties/${propertyId}`);
};

export const createProperty = async (property) => {
  const payload = {
    url: "properties",
    data: property,
  };
  return await ApiServices.post(payload);
};

export const updateProperty = async (property) => {
  const payload = {
    url: "properties/update",
    data: property,
  };
  return await ApiServices.post(payload);
};

export const updatePropertyStatus = async (property) => {
  const payload = {
    url: "properties/update/status",
    data: property,
  };
  return await ApiServices.post(payload);
};
