/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import FormikInputField from "../../common/form/FormikInput";
import { useDispatch } from "react-redux";
import { SET_USER_PROFILE } from "../../redux/sagas/actions";
import { ApiServices } from "../../http/httpServices";
import userSchema from "../../validation/userSchema";

const Auth = () => {
  const [isLoginType, setIsLoginType] = useState(true);
  const [form, setForm] = useState(null);
  const dispatch = useDispatch();

  const loginInitial = {
    username: "",
    password: "",
  };

  const signupInitial = {
    username: "",
    password: "",
    contactNo: "",
    fullname: "",
  };

  useEffect(() => {
    if (isLoginType) {
      setForm(loginInitial);
    } else {
      setForm((prev) => ({ ...prev, ...signupInitial }));
    }
  }, [isLoginType]);

  const handleSubmit = async (values, action) => {
    const url = isLoginType ? "/auth/login" : "/auth/register";
    const { data, status, message } = await ApiServices.post({
      url: url,
      data: values,
    });

    if (status) {
      emitSuccessToast(message);
      if (isLoginType) {
        dispatch(SET_USER_PROFILE(data));
        // Navigate to the home page after successful login
        // window.location.href = "/";
      }
      setIsLoginType(true);
    } else {
      emitErrorToast(message);
    }
  };

  return (
    <>
      {form && (
        <div
          className="container d-flex justify-content-center align-items-start"
          style={{ minHeight: "50vh", padding: "20px" }}
        >
          <div
            className="shadow-lg rounded p-4"
            style={{
              minWidth: "550px",
              backgroundColor: "#fff",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Formik
              initialValues={form}
              onSubmit={handleSubmit}
              validationSchema={!isLoginType ? userSchema : undefined}
              enableReinitialize
            >
              {(formik) => (
                <Form>
                  <h2 className="text-center mb-4">
                    {isLoginType ? "Please Login" : "Please Signup"}
                  </h2>

                  <div className="pb-3">
                    <FormikInputField
                      name="username"
                      formik={formik}
                      label="Username"
                      placeholder="Enter username"
                    />
                    <FormikInputField
                      name="password"
                      formik={formik}
                      label="Password"
                      placeholder="Enter password"
                      type="password" // Ensure it's password type
                    />
                    {!isLoginType && (
                      <>
                        <FormikInputField
                          name="contactNo"
                          formik={formik}
                          label="Contact"
                          placeholder="Enter Contact Number"
                        />
                        <FormikInputField
                          name="fullname"
                          formik={formik}
                          label="Full Name"
                          placeholder="Enter full name"
                        />
                      </>
                    )}

                    <div className="d-flex justify-content-between align-items-center pt-4">
                      <button
                        type="submit"
                        className="btn btn-primary px-5 py-2 rounded-pill"
                      >
                        Submit
                      </button>

                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => {
                          setForm(null);
                          setIsLoginType((prev) => !prev);
                        }}
                        style={{
                          color: "#007bff",
                          textDecoration: "none",
                        }}
                      >
                        {isLoginType
                          ? "Don't have an account? Signup"
                          : "Already have an account? Login"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
