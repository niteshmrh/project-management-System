import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

function CameraOn(props) {
  // const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [seconds, setSeconds] = useState(5);

  // const [retakePhoto, setRetakePhoto] = useState(false);
  // const [showSubmit, setShowSubmit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log(id);
  let picture = null;

  // face detection
  const { imgRef, webcamRef, boundingBox, isLoading, detected, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),
      camera: ({ mediaSrc, onFrame, width, height }) =>
        new Camera(mediaSrc, {
          onFrame,
          width,
          height,
        }),
    });

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
    clearTimeout();
  };

  console.log("base 64-------------", photo);
  const retake = async () => {
    navigate(0);
    picture = null;
    setPhoto(null);
    setSeconds(5);
  };

  if (photo) {
    if (facesDetected != 1) {
      retake();
    }
  }

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
            <p className="bold">{`Number of faces detected: ${facesDetected}`}</p>
            <img src={photo} alt="captured" className="mt-3 rounded-circle" />
            <div className="mt-5 justify-content-between">
              <button onClick={() => retake()}>Ratake</button>
              <button onClick={() => saveImage()}>Submit</button>
            </div>
          </div>
        ) : (
          // <>
          //   <p>{`Loading: ${isLoading}`}</p>
          //   <p>{`Face Detected: ${detected}`}</p>
          //   <p>{`Number of faces detected: ${facesDetected}`}</p>
          //   <div
          //     style={{ width: "100vw", height: "100vh", position: "relative" }}
          //   >
          //     {boundingBox.map((box, index) => (
          //       <div
          //         key={`${index + 1}`}
          //         style={{
          //           border: "4px solid red",
          //           position: "absolute",
          //           top: `${box.yCenter * 100}%`,
          //           left: `${box.xCenter * 100}%`,
          //           width: `${box.width * 100}%`,
          //           height: `${box.height * 100}%`,
          //           zIndex: 1,
          //         }}
          //       />
          //     ))}
          //     <img
          //       crossOrigin="anonymous"
          //       ref={imgRef}
          //       alt=""
          //       style={{
          //         position: "absolute",
          //         marginLeft: "auto",
          //         marginRight: "auto",
          //         left: "0",
          //         right: "0",
          //         textAlign: "center",
          //         zIndex: 0,
          //         width: "100%",
          //         height: "100%",
          //         objectFit: "fill",
          //       }}
          //       src={photo}
          //     />
          //   </div>
          //   <div className="mt-5 justify-content-between">
          //     <button onClick={() => retake()}>Ratake</button>
          //     <button onClick={() => saveImage()}>Submit</button>
          //   </div>
          <center className="mt-3">
            <h5>
              The image will be clicked in {seconds} seconds automatically!
            </h5>
            <p>{`Loading: ${isLoading}`}</p>
            <p>{`Face Detected: ${detected}`}</p>
            <p>{`Number of faces detected: ${facesDetected}`}</p>
            <div
              style={{ width: "100%", height: "500px", position: "relative" }}
            >
              {boundingBox.map((box, index) => (
                <div
                  key={`${index + 1}`}
                  style={{
                    border: "4px solid red",
                    position: "absolute",
                    top: `${box.yCenter * 100}%`,
                    left: `${box.xCenter * 100}%`,
                    width: `${box.width * 100}%`,
                    height: `${box.height * 100}%`,
                    zIndex: 1,
                  }}
                />
              ))}
              <Webcam
                className="mt-3 rounded-circle"
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                // forceScreenshotSourceSize
                // width={560}
                videoConstraints={videoConstraints}
              />
            </div>
          </center>
        )}
      </div>
    </div>
  );
}
export default CameraOn;
