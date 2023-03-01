import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

function UpadtePerson(props) {
  const { id } = useParams();
  // const user = props.person;
  // // const [formData, setFormData] = useState({});
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("props---", props, id);
  // console.log("person-----", user);

  const formik = useFormik({
    initialValues: {
      Name: props?.person?.Name,
      Email: props?.person?.Email,
      Mobile: props?.person?.Mobile,
      Pan: props?.person?.Pan,
      Aadhar: props?.person?.Aadhar,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      // console.log("Submitted", values, id, values.Name);
      try {
        setIsLoading(true);
        const response = await axios.put(
          "http://localhost:3000/api/person/" + id,
          {
            Name: values.Name,
            Email: values.Email,
            Mobile: values.Mobile,
            Pan: values.Pan,
            Aadhar: values.Aadhar,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
          setIsFormSubmit(true);
          window.location = "/";
        } else {
          alert("Something went wrong!!!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
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
    }),
  });

  if (isLoading) {
    <Loader />;
  }

  return (
    <div>
      <div
        className="modal fade"
        id="updateperson"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Person
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    onChange={formik.handleChange}
                    value={formik.values.Name}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Name && formik.errors.Name ? (
                    <div className="errors">{formik.errors.Name}</div>
                  ) : (
                    <div>{null}</div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="Email"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.Email}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Email && formik.errors.Email ? (
                    <div className="errors">{formik.errors.Email}</div>
                  ) : (
                    <div>{null}</div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="Mobile"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.Mobile}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Mobile && formik.errors.Mobile ? (
                    <div className="errors">{formik.errors.Mobile}</div>
                  ) : (
                    <div>{null}</div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Pan</label>
                  <input
                    type="text"
                    name="Pan"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.Pan}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Pan && formik.errors.Pan ? (
                    <div className="errors">{formik.errors.Pan}</div>
                  ) : (
                    <div>{null}</div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Aadhar</label>
                  <input
                    type="text"
                    name="Aadhar"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.Aadhar}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Aadhar && formik.errors.Aadhar ? (
                    <div className="errors">{formik.errors.Aadhar}</div>
                  ) : (
                    <div>{null}</div>
                  )}
                </div>
                {/* className="modal-footer" */}
                <div>
                  {isFormSubmit ? (
                    <button type="submit" className="btn btn-primary">
                      Submmiting....
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpadtePerson;
