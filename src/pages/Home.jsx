import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import UpdateIcon from "@mui/icons-material/Update";
import Loader from "../components/Loader";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { NavLink } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";

function Home(props) {
  const [personData, setPersonData] = useState([]);
  const [loding, setLoading] = useState(false);
  const [isDeleteClient, setIsDeleteClient] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
    // console.log("++++++++++++++++", e.selected + 1);
  };

  useEffect(() => {
    fetchPersonApiCount();
    fetchPersonApi();
  }, [isDeleteClient, page]);

  const fetchPersonApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/person?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setPersonData(response.data.data);
        setLoading(false);

        // console.log("res---", response.data.data);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPersonApiCount = async () => {
    try {
      // setLoading(true);
      const responseCount = await axios.get(
        `http://localhost:3000/api/person/count/users`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseCount.status === 200) {
        setCount(responseCount.data.data[0].length);
        // setLoading(false);
        // console.log("res---", responseCount.data.data[0].length);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("count-------", count);

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
                  {/* <th scope="col"></th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Pan</th>
                  <th scope="col">Aadhar</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                  <th scope="col">Add Image</th>
                </tr>
              </thead>
              <tbody>
                {personData.map((person) => (
                  <tr className="person-lists" key={person.personId}>
                    <td>
                      {/* <img
                        className="r"
                        src={person.Photo}
                        alt=""
                        width="15%"
                        height="25%"
                        style={{ borderRadius: "50%" }}
                      /> */}
                      {person.Name}
                    </td>
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
                    <td>
                      <NavLink to={`camera/${person.personId}`}>
                        <button className="btn btn-primary">
                          <CameraAltIcon />
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

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        // initialPage={0}
        forcePage={page == 1 ? 0 : page - 1}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(count / 5 + 1)}
        marginPagesDisplayed={2}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        disabledClassName={"disabled"}
      />
    </div>
  );
}

export default Home;
