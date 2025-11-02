import * as yup from "yup";

let propertySchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Required !")
    .min(10, "Title too short !")
    .max(50, "Title too long !"),
  description: yup
    .string()
    .trim()
    .required("Required !")
    .min(100, "Description min length 100!")
    .max(1000, "Description max length 1000!"),
  price: yup.number().required("Required !").min(1),
  location: yup.string().trim().required("Required !"),
  address: yup
    .string()
    .trim()
    .required("Required !")
    .min(10, "Title too short !")
    .max(50, "Title too long !"),
  category: yup.string().trim().required("Required !"),
});

export default propertySchema;
