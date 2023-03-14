import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";
import PaymentIcon from "@mui/icons-material/Payment";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import Loader from "../components/Loader";
import UpadtePerson from "../components/UpadtePerson";
import UpdateIcon from "@mui/icons-material/Update";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import html2PDF from "jspdf-html2canvas";
import { saveAs } from "file-saver";

function PersonDetails(props) {
  const { id } = useParams();
  const [person, setPerson] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPersonApi();
  }, []);

  const fetchPersonApi = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/person/${id}?populate=*`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPerson(response.data.data);
        setIsLoading(false);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("Person Details[0]------", person[0]);
  // console.log("Person Details------", person);
  // console.log(person.length);

  //***************** posting url for download current webpage *************************

  const postUrlToApi = async () => {
    var myurl = `http://localhost:3001/${id}`;
    console.log(id);
    console.log("downloading----", myurl);
    const response = await axios
      .post(
        "http://localhost:3000/api/person/download",

        {
          url: myurl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() =>
        axios
          .get("http://localhost:3000/api/person/download/fetch-pdf", {
            responseType: "blob",
          })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            console.log("hittt get-----", pdfBlob);
            saveAs(pdfBlob, `${person[0].Name}.pdf`);
          })
      );

    if (response.status === 200) {
      console.log("Downloading........... ");
    } else {
      alert("Something went wrong!!!");
    }
  };

  // function to convert into CSV and download file

  function convertToCsv(data) {
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(","),
      ...data.map((row) => headers.map((header) => row[header]).join(",")),
    ].join("\n");
    return csv;
  }

  // make file downloadable in CSV

  function downloadData() {
    const csv = convertToCsv(person);
    const url = window.URL.createObjectURL(new Blob([csv]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "person.csv");
    document.body.appendChild(link);
    link.click();
  }

  // make file download in pdf

  // function downloadPdf() {
  //   const pdfFile = convertToCsv(person);
  //   const url = window.URL.createObjectURL(new Blob([pdfFile]));
  //   const link = document.createElement("a");
  //   link.href = "http://localhost:3001/1";
  //   link.setAttribute("download", "file.pdf");
  //   // document.body.appendChild(link);
  //   link.click();
  // }

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="py-5">
      <div className="container" id="page">
        <div className="row">
          <div className="col-md-12">
            <div className="border p-3 rounded">
              <div className="text-end">
                <NavLink to="/">
                  <button className="btn btn-light">
                    <KeyboardBackspaceIcon
                      style={{ fontSize: "22px", marginRight: "5px" }}
                    />
                    Back
                  </button>
                </NavLink>
              </div>

              {/* ***************************************************************** */}
              {/* <div>i am {id}</div> */}
              {person.length > 0 ? (
                <div className="mt-5">
                  <h5 className="mb-3">Person Information</h5>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="justify-content-end">
                        <img
                          className="r"
                          src={person[0].Photo}
                          alt="Add image"
                          width="25%"
                          height="35%"
                          style={{ marginLeft: "150px", borderRadius: "50%" }}
                        />
                        <span className="float-end fw-lighter text center">
                          Image
                        </span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <AccountCircleIcon
                        style={{ fontSize: "22px", marginRight: "8px" }}
                      />
                      {person[0].Name}
                      <span className="float-end fw-lighter">Name</span>
                    </li>

                    <li className="list-group-item">
                      <MailOutlineIcon
                        style={{ fontSize: "22px", marginRight: "8px" }}
                      />
                      {person[0].Email}
                      <span className="float-end fw-lighter">Email</span>
                    </li>

                    <li className="list-group-item">
                      <CallIcon
                        style={{ fontSize: "22px", marginRight: "8px" }}
                      />
                      {person[0].Mobile}
                      <span className="float-end fw-lighter">Phone</span>
                    </li>

                    <li className="list-group-item">
                      <PaymentIcon
                        style={{ fontSize: "22px", marginRight: "8px" }}
                      />
                      {person[0].Pan}
                      <span className="float-end fw-lighter">Pan </span>
                    </li>

                    <li className="list-group-item">
                      <BrandingWatermarkIcon
                        style={{ fontSize: "22px", marginRight: "8px" }}
                      />
                      {person[0].Aadhar}
                      <span className="float-end fw-lighter">Aadhar</span>
                    </li>

                    <li className="list-group-item">
                      <QueryBuilderIcon
                        style={{ fontSize: "22px", marginRight: "8px" }}
                      />
                      {person[0].Created_Time}
                      <span className="float-end fw-lighter">Created On</span>
                    </li>

                    <li className="list-group-item">
                      <QueryBuilderIcon
                        style={{ fontSize: "22px", marginRight: "8px" }}
                      />
                      {person[0].Updated_Time}
                      <span className="float-end fw-lighter">Updated On</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <h1>Data Not Found</h1>
              )}
              <ul className="d-flex flex-row justify-content-between col-md-12">
                <li className="mt-3 list-group-item">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateperson"
                    //   id={id}
                  >
                    <UpdateIcon
                      style={{ fontSize: "22px", marginRight: "8px" }}
                    />
                    Update
                  </button>
                </li>
                <li className="mt-3 list-group-item">
                  <NavLink to={`/camera/${id}`}>
                    <button className="btn btn-primary">
                      <CameraAltIcon /> Update Photo
                    </button>
                  </NavLink>
                </li>
                <li className="mt-3 list-group-item">
                  <button className="btn btn-success" onClick={downloadData}>
                    Download CSV
                  </button>
                </li>
                <li className="mt-3 list-group-item">
                  {/*    onClick={downloadPdf}*/}
                  <button className="btn btn-success" onClick={postUrlToApi}>
                    Download PDF
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <UpadtePerson person={person[0]} />
    </div>
  );
}

export default PersonDetails;
