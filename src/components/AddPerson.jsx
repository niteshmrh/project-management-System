import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import * as Yup from "yup";

const initialValues = {
  Name: "",
  Email: "",
  Mobile: "",
  Pan: "",
  Aadhar: "",
  // Photo: "",
};

// let formData = new FormData();

const onSubmit = async (values) => {
  console.log("Submitted", values);

  // console.log("Submitted name ----", values.Name);
  // formData.append("Name", values.Name);
  // formData.append("Email", values.Email);
  // formData.append("Pan", values.Pan);
  // formData.append("Mobile", values.Mobile);
  // formData.append("Aadhar", values.Aadhar);
  // formData.append("Photo", values.Photo);

  try {
    // setIsFormSubmit(true);
    const response = await axios.post(
      "http://localhost:3000/api/person",
      {
        Name: values.Name,
        Email: values.Email,
        Pan: values.Pan,
        Mobile: values.Mobile,
        Aadhar: values.Aadhar,
        // Photo: values.Photo,
      },

      {
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("respone---", response);
    if (response.status === 201) {
      // setIsFormSubmit(false);
      window.location = "/";
    } else {
      alert("Something went Wrong !!!");
    }
  } catch (error) {
    console.log(error);
  }
};

const validationSchema = Yup.object({
  Name: Yup.string().required("Required"),
  Email: Yup.string()
    .matches(/^[a-z0-9](.?[a-z0-9]*){5,}@g(oogle)?mail.com$/)
    .required("Enter valid Email "),
  Mobile: Yup.string()
    .matches(/^[+]{1}[9]{1}[1]{1}[9876][0-9]{9}$/)
    .required("Enter valid Mobile Number"),
  Pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .required("Enter Valid Pan Number"),
  Aadhar: Yup.string()
    .matches(/^[0-9]{12}$/)
    .required("Enter valid Aadhar Number"),
});

function AddPerson(props) {
  // const [formData, setFormData] = useState({});
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  // console.log("Form Value", formik.values);
  // console.log("Form errors", formik.errors);
  // console.log("Visited one", formik.touched);
  // console.log("form Data-----", formData);

  return (
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal fade" id="addPerson" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-center"
                id="exampleModalLabel"
              >
                Add person
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="mb-2">
                    <label className="form-label">Name</label>
                    <Field
                      type="text"
                      name="Name"
                      placeholder="Enter Name"
                      className="form-control"
                    />
                    <ErrorMessage name="Name">
                      {(ErrorMsg) => <div className="errors">{ErrorMsg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email</label>
                    <Field
                      type="email"
                      name="Email"
                      placeholder="Enter Mail"
                      className="form-control"
                    />
                    <ErrorMessage name="Email">
                      {(ErrorMsg) => <div className="errors">{ErrorMsg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Phone</label>
                    <Field
                      type="text"
                      name="Mobile"
                      placeholder="+91"
                      className="form-control"
                    />
                    <ErrorMessage name="Mobile">
                      {(ErrorMsg) => <div className="errors">{ErrorMsg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Pan</label>
                    <Field
                      type="text"
                      name="Pan"
                      placeholder="Enter PAN Number"
                      className="form-control"
                    />
                    <ErrorMessage name="Pan">
                      {(ErrorMsg) => <div className="errors">{ErrorMsg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Aadhar</label>
                    <Field
                      type="text"
                      name="Aadhar"
                      placeholder="Enter Aadhar Card"
                      className="form-control"
                    />
                    <ErrorMessage name="Aadhar">
                      {(ErrorMsg) => <div className="errors">{ErrorMsg}</div>}
                    </ErrorMessage>
                  </div>
                  {/* className="modal-footer" */}
                  {/* <div className="mb-2">
                    <label className="form-label">Upload Image</label>
                    <Field
                      type="file"
                      name="Photo"
                      placeholder="Enter Image in jpg/jpeg"
                      className="form-control"
                    />
                    <NavLink to="/camera">
                      <button className="btn btn-primary">
                        <CameraAltIcon />
                      </button>
                    </NavLink> 
                  </div> */}
                  <div>
                    {isFormSubmit ? (
                      <button type="submit" className="btn btn-primary">
                        Submmiting....
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    )}
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddPerson;
