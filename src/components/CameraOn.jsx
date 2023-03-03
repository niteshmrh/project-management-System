import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  //   console.log(id);
  let picture = null;


  setTimeout(async () => {
    picture = webcamRef?.current?.getScreenshot();
    setPhoto(picture);
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
        if (response.status == 200) {
          window.location = "/";
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, 3000);

  console.log("Photo", photo);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    clearTimeout();
  }, [seconds]);

  return (
    <center className="mt-5">
      <h5>The image will be clicked in {seconds} seconds automatically!</h5>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        width={460}
        videoConstraints={videoConstraints}
        className="mt-5"
      />
    </center>
  );
}
export default CameraOn;
