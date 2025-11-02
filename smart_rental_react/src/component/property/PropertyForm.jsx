import { Form, Formik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import FormikInputField from "../../common/form/FormikInput";
import FormikSelect from "../../common/form/FormikSelect";
import propertySchema from "../../validation/propertySchema";
import FormikTextArea from "../../common/form/FormikTextArea";
import { getLocationsCategories } from "../../helpers/api/homeApi";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import Error from "../../common/Error";
import Loading from "../../common/Loading";
import { createProperty, updateProperty } from "../../helpers/api/propertyApi";
import { useNavigate } from "react-router-dom";
import FormikSwitch from "../../common/form/FormikSwitch";

const PropertyForm = ({ property }) => {
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      title: "",
      description: "",
      price: 0,
      category: "",
      available: true,
      location: "",
      address: "",
    }),
    []
  );

  const [form, setForm] = useState(initialValues);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getRequiredData = useCallback(async () => {
    const { status, data, message } = await getLocationsCategories();

    if (!status) {
      emitErrorToast(message);
      setError(true);
    } else {
      setCategories(data?.categories);
      setLocations(data?.locations);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getRequiredData();

    if (property) {
      setForm((prev) => ({ ...prev, ...property }));
    }
  }, [property, getRequiredData]);

  const handleSubmit = async (values, action) => {
    let { resetForm } = action;

    let status, message;
    if (property) {
      const response = await updateProperty(values, property.id);
      status = response.status;
      message = response.message;
    } else {
      const response = await createProperty(values);
      status = response.status;
      message = response.message;
    }

    if (!status) {
      emitErrorToast(message);
    } else {
      emitSuccessToast(message);
      resetForm();
      navigate("/profile");
    }
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    <Loading />;
  }

  return (
    <>
      {form && (
        <div className="container d-flex justify-content-center align-items-center, p-2">
          <div
            className="shadow-lg rounded p-4 w-100"
            style={{
              minWidth: "550px",
              maxWidth: "700px",
              backgroundColor: "#fff",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Formik
              initialValues={form}
              onSubmit={handleSubmit}
              enableReinitialize
              validationSchema={propertySchema}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <h2 className="text-center mb-4">
                    {property ? "Update Property" : "Add Property"}
                  </h2>

                  <div className="pb-3">
                    <FormikInputField
                      name="title"
                      formik={formik}
                      label="Title"
                      placeholder="Enter title"
                    />
                    <FormikSelect
                      label="Property Type"
                      name="category"
                      options={categories}
                      formik={formik}
                    />
                    <FormikSelect
                      label="Location"
                      name="location"
                      options={locations}
                      formik={formik}
                    />

                    <FormikInputField
                      name="address"
                      formik={formik}
                      label="Address"
                      placeholder="Enter Address"
                    />
                    <FormikInputField
                      type="number"
                      name="price"
                      formik={formik}
                      label="Price"
                      placeholder="Enter property price"
                    />
                    <FormikTextArea
                      name="description"
                      label="Decription"
                      formik={formik}
                    />
                    {property && (
                      <FormikSwitch
                        name="available"
                        formik={formik}
                        label="Available"
                      />
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary mt-3 px-5 py-2 rounded-pill"
                    >
                      Submit
                    </button>
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

export default PropertyForm;
