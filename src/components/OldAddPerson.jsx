import React, { useState } from "react";
import axios from "axios";
import { Formik, useFormik } from "formik";
// import Loader from "../components/Loader";
import * as Yup from "yup";

const initialValues = {
  Name: "",
  Email: "",
  Mobile: "",
  Pan: "",
  Aadhar: "",
};

const onSubmit = (values) => {
  console.log("Submitted", values);
};

// const validate = (values) => {
//   // values.Name values.Email values.Pan values.Mobile values.Aadhar
//   // errors.Name errors.Email errors.Pan errors.Mobile errors.Aadhar

//   let errors = {};

//   if (!values.Name) {
//     errors.Name = "Required";
//   }

//   if (!values.Email) {
//     errors.Email = "Required";
//   } else if (
//     !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(values.Email)
//   ) {
//     errors.Email = "Enter valid Email";
//   }

//   if (!values.Mobile) {
//     errors.Mobile = "Required";
//   } else if (!/^[+]{1}[9]{1}[1]{1}[9876][0-9]{9}$/) {
//     errors.Mobile = "Enter 10 digit Valid Mobile Number using +91";
//   }

//   if (!values.Pan) {
//     errors.Pan = "Required";
//   } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.Pan)) {
//     errors.Pan = "Enter valid pan Number";
//   }

//   if (!values.Aadhar) {
//     errors.Aadhar = "Required";
//   } else if (!/^[0-9]{12}$/.test(values.Aadhar)) {
//     errors.Aadhar = "Enter 12 digit valid Aadhar Card";
//   }

//   return errors;
// };

const validationSchema = Yup.object({
  Name: Yup.string().required("Required"),
  Email: Yup.string()
    .matches(/^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$/)
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

function OldAddPerson(props) {
  const [formData, setFormData] = useState({});
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate
  });

  // console.log("Form Value", formik.values);
  // console.log("Form errors", formik.errors);
  // console.log("Visited one", formik.touched);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  //   console.log(formData);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   try {
  //     setIsFormSubmit(true);
  //     const response = await axios.post(
  //       "http://localhost:3000/api/person",
  //       {
  //         Name: formData.Name,
  //         Email: formData.Email,
  //         Pan: formData.Pan,
  //         Mobile: formData.Mobile,
  //         Aadhar: formData.Aadhar,
  //         // Current_Time: Date(),
  //         // Updated_Time: Date(),
  //       },

  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     // console.log("respone---", response);
  //     if (response.status === 201) {
  //       setIsFormSubmit(false);
  //       window.location = "/";
  //     } else {
  //       alert("Something went Wrong !!!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
              <Formik>
                <form onSubmit={formik.handleSubmit}>
                  {/* onSubmit={(e) => handleSubmit(e)} */}
                  <div className="mb-2">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Name"
                      placeholder="Enter Name"
                      // value={formData.Name}
                      // onChange={(e) => console.log(e.target.value)}
                      // onChange={(e) => handleChange(e)}
                      // required
                      onChange={formik.handleChange}
                      value={formik.values.Name}
                      onBlur={formik.handleBlur}
                      // {...formik.getFieldProps("Name")}
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
                      placeholder="Enter Mail"
                      className="form-control"
                      // value={formData.Email}
                      // onChange={(e) => handleChange(e)}
                      // required
                      onChange={formik.handleChange}
                      value={formik.values.Email}
                      onBlur={formik.handleBlur}
                      // {...formik.getFieldProps("Email")}
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
                      placeholder="+91"
                      className="form-control"
                      // value={formData.Mobile}
                      // onChange={(e) => handleChange(e)}
                      // required
                      onChange={formik.handleChange}
                      value={formik.values.Mobile}
                      onBlur={formik.handleBlur}
                      // {...formik.getFieldProps("Mobile")}
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
                      placeholder="Enter PAN Number"
                      className="form-control"
                      // value={formData.Pan}
                      // onChange={(e) => handleChange(e)}
                      // required
                      onChange={formik.handleChange}
                      value={formik.values.Pan}
                      onBlur={formik.handleBlur}
                      // {...formik.getFieldProps("Pan")}
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
                      placeholder="Enter Aadhar Card"
                      className="form-control"
                      // value={formData.Aadhar}
                      // onChange={(e) => handleChange(e)}
                      // required
                      onChange={formik.handleChange}
                      value={formik.values.Aadhar}
                      onBlur={formik.handleBlur}
                      // {...formik.getFieldProps("Aadhar")}
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
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OldAddPerson;
