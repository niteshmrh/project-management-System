import React from "react";
import Webcam from "react-webcam";

function AddNewPerson(props) {
  const getScreenshot = () => {};
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const WebcamCapture = () => (
    <Webcam
      audio={false}
      height={250}
      screenshotFormat="image/jpeg"
      width={350}
      videoConstraints={videoConstraints}
    >
      {({ getScreenshot }) => (
        <button
          onClick={() => {
            const imageSrc = getScreenshot();
          }}
        >
          Capture photo
        </button>
      )}
    </Webcam>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <button
            onClick={() => {
              const imageSrc = getScreenshot();
            }}
          >
            Capture photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewPerson;
