import React, { useState } from "react";
import axios from "axios";

function AddPerson(props) {
  const [formData, setFormData] = useState({});
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //   console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setIsFormSubmit(true);
      const response = await axios.post(
        "http://localhost:3000/api/person",
        {
          data: [
            {
              Name: formData.Name,
              Email: formData.Email,
              Pan: formData.Pan,
              Mobile: formData.Mobile,
              Aadhar: formData.Aadhar,
              // Current_Time: Date(),
              // Updated_Time: Date(),
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("respone---", response);
      if (response.status === 201) {
        setIsFormSubmit(false);
        window.location = "/";
      } else {
        alert("Something went Wrong !!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    placeholder="Enter Name"
                    // value={formData.name}
                    // onChange={(e) => console.log(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="Email"
                    placeholder="Enter Mail"
                    // value={formData.email}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="Mobile"
                    placeholder="+91"
                    // value={formData.phone}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pan</label>
                  <input
                    type="text"
                    name="Pan"
                    placeholder="Enter PAN Number"
                    // value={formData.phone}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Aadhar</label>
                  <input
                    type="text"
                    name="Aadhar"
                    placeholder="Enter Aadhar Card"
                    // value={formData.phone}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                  />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddPerson;
