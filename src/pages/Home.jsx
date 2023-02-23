import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import UpdateIcon from "@mui/icons-material/Update";
import Loader from "../components/Loader";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { NavLink } from "react-router-dom";

function Home(props) {
  const [personData, setPersonData] = useState([]);
  const [loding, setLoading] = useState(false);
  const [isDeleteClient, setIsDeleteClient] = useState(false);

  //   useEffect(() => {
  //     axios.get("http://localhost:3000/api/person").then((res) => {
  //       setPersonData(res.data.data);
  //     });
  //   }, []);

  useEffect(() => {
    fetchPersonApi();
  }, [isDeleteClient]);

  const fetchPersonApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/person", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setPersonData(response.data.data);
        setLoading(false);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePerson = async (id) => {
    try {
      setIsDeleteClient(true);
      const responce = await axios.delete(
        "http://localhost:3000/api/person/" + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (responce.status === 200) {
        setIsDeleteClient(false);
        window.location = "/"; //comming this to not reload the whole page
      } else {
        alert("Somethings went wrong !!!!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   console.log(personData);
  if (loding) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="text-center mt-3">
        <div className="fs-1 fw-bold ">All Employee Details</div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="mt-3 text-center">
            <table className="table border">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Pan</th>
                  <th scope="col">Aadhar</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {personData.map((person) => (
                  <tr className="person-lists" key={person.personId}>
                    <td>{person.Name}</td>
                    <td>{person.Email}</td>
                    <td>{person.Mobile}</td>
                    <td>{person.Pan}</td>
                    <td>{person.Aadhar}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeletePerson(person.personId)}
                      >
                        <DeleteForeverIcon />
                      </button>
                    </td>
                    <td>
                      <NavLink to={`${person.personId}`}>
                        <button className="btn btn-primary">
                          <BorderColorIcon />
                        </button>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
