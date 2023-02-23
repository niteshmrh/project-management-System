import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpadtePerson(props) {
  const [formData, setFormData] = useState({});
  const { id } = useParams();

  //   const [person, setPerson] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadhar, setAadhar] = useState("");

  useEffect(() => {
    if (props) {
      setName(props?.person?.Name);
      setEmail(props?.person?.Email);
      setPan(props?.person?.Pan);
      setMobile(props?.person?.Mobile);
      setAadhar(props?.person?.Aadhar);
    }
  }, [props]);

  const submitForms = (e) => {
    e.preventDefault();
    updateProject();
  };

  const updateProject = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:3000/api/person/" + id,
        {
          data: [
            {
              Name: name,
              Email: email,
              Mobile: mobile,
              Pan: pan,
              Aadhar: aadhar,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        window.location = "/";
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        class="modal fade"
        id="updateperson"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Person
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={(e) => submitForms(e)}>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    value={`${name ? name : ""}`}
                    // onChange={(e) => console.log(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="Email"
                    value={`${email ? email : ""}`}
                    className="form-control"
                    // onChange={(e) => handleChange(e)}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="Mobile"
                    value={`${mobile ? mobile : ""}`}
                    className="form-control"
                    // onChange={(e) => handleChange(e)}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Pan</label>
                  <input
                    type="text"
                    name="Pan"
                    value={`${pan ? pan : ""}`}
                    className="form-control"
                    // onChange={(e) => handleChange(e)}
                    onChange={(e) => setPan(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Aadhar</label>
                  <input
                    type="text"
                    name="Aadhar"
                    value={`${aadhar ? aadhar : ""}`}
                    className="form-control"
                    // onChange={(e) => handleChange(e)}
                    onChange={(e) => setAadhar(e.target.value)}
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
