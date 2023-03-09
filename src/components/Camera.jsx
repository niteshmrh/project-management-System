import React, { useState, useRef } from "react";

function Camera() {
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [second, setSecond] = useState(5)

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.log("Error accessing camera: ", error);
      });
  };

  const takePicture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imageUrl = canvas.toDataURL("image/png");
    setImageSrc(imageUrl);
    setShowSubmit(true);
  };

  const retakePicture = () => {
    setImageSrc(null);
    setShowSubmit(false);
    startCamera();
  };

  const handleTimer = () => {
    setTimeout(() => {
      takePicture();
    }, 5000);
  };

  return (
    <div>
      {imageSrc ? (
        <div>
          <img src={imageSrc} alt="Camera capture" />
          {showSubmit && (
            <button onClick={() => console.log("Submitted!")}>Submit</button>
          )}
          <button onClick={retakePicture}>Retake</button>
        </div>
      ) : (
        <div>
          <video ref={videoRef} autoPlay />
          <button
            onClick={() => {
              startCamera();
              handleTimer();
            }}
          >
            Start Camera
          </button>
        </div>
      )}
    </div>
  );
}

export default Camera;
