import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

function CameraOn(props) {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [seconds, setSeconds] = useState(5);
  // const [retakePhoto, setRetakePhoto] = useState(false);
  // const [showSubmit, setShowSubmit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log(id);
  let picture = null;

  useEffect(() => {
    captureImage();
  }, []);

  // const capture = () => {
  //   captureImage(() => {
  //     if (seconds > 0) {
  //       setTimeout(() => {
  //         setSeconds(seconds - 1);
  //       }, 1000);
  //     }
  //     clearTimeout();
  //   });
  // };

  // const setTimer = () => {
  //   setTimeout(() => {
  //     setSeconds(seconds - 1);
  //     console.log("settimer");
  //   }, 1000);
  // };

  useEffect(() => {
    setTimer();
  }, [seconds]);

  const setTimer = () => {
    if (seconds >= 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        // console.log("-----------", seconds);
      }, 1000);
    }
    clearTimeout();
  };

  const captureImage = () => {
    setTimeout(async () => {
      setTimer();
      let mypic = await webcamRef?.current?.getScreenshot();
      setPhoto(mypic);
    }, 5000);
  };
  // console.log("base 64-------------", photo);
  const retake = async () => {
    navigate(0);
    picture = null;
    setPhoto(null);
    setSeconds(5);
  };

  const saveImage = async () => {
    if (photo) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/person/camera/${id}`,
          {
            Photo: photo,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("-----------------", response);
        if (response.status == 200) {
          window.location = "/";
        }
      } catch (error) {
        console.log("..capture image...", error);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        {photo ? (
          <div>
            <img src={photo} alt="captured" className="mt-5 rounded-circle" />
            <div className="mt-5 justify-content-between">
              <button onClick={() => retake()}>Ratake</button>
              <button onClick={() => saveImage()}>Submit</button>
            </div>
          </div>
        ) : (
          <center className="mt-5">
            <h5>
              The image will be clicked in {seconds} seconds automatically!
            </h5>
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              // width={560}
              videoConstraints={videoConstraints}
              className="mt-5 rounded-circle"
            />
          </center>
        )}
      </div>
    </div>
  );
}
export default CameraOn;
