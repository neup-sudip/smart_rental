import * as yup from "yup";

const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const nepaliPhoneRegex = /^9\d{9}$/;

const userSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required!")
    .min(6, "Username too short!")
    .max(20, "Username too long!")
    .matches(usernameRegex, "Username can only contain letters and numbers!"),

  password: yup
    .string()
    .trim()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters long!")
    .max(20, "Password too long!")
    .matches(
      passwordRegex,
      "Password must contain at least one letter, one number, and one special character!"
    ),

  fullname: yup
    .string()
    .trim()
    .required("Full name is required!")
    .min(6, "Full name too short!")
    .max(35, "Full name too long!"),

  contactNo: yup
    .string()
    .trim()
    .required("Contact number is required!")
    .matches(
      nepaliPhoneRegex,
      "Invalid Nepali phone number! Must start with 9 and be 10 digits."
    ),
});

export default userSchema;
