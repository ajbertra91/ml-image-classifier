import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import { MdCameraswitch } from 'react-icons/md';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user", // || { exact: "environment" }
  mirror: true
};

export const WebcamCapture = ({postCaptureCb, ...props}) => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState('');
  const [facingMode, setFacingMode] = useState('user');
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [height] = useState(450);
  const [width] = useState(800);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setIsImageCaptured(true);
    });

  useEffect(() => {
    if (isImageCaptured) {
      postCaptureCb();
      setIsImageCaptured(false);
    }
  }, [isImageCaptured, postCaptureCb]);

  const toggleCamera = () => {
    if (facingMode &&  facingMode.exact) {
      setFacingMode('user');
    } else {
      setFacingMode({exact: 'environment'})
    }
  }

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image === ''
          ? <>
            <Webcam
              audio={false}
              height={height}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={width}
              videoConstraints={videoConstraints}
            />
            </>
          : <img src={image} alt="" id="image" />
        }
      </div>

      <>
        {isImageCaptured
          ? <button onClick={(e) => { e.preventDefault(); setImage(''); }} className="webcam-btn"
              >Retake Image</button>
          : <button onClick={(e) => { e.preventDefault(); capture(); }} className="webcam-btn"
              >Capture</button>
        }
        <button onClick={(e) => {
          e.preventDefault();
          toggleCamera();
        }} className="switch-btn"
        ><MdCameraswitch /></button>
      </>
    </div>
  );
};