import React, { useState } from 'react';
import * as ml5 from "ml5";
import { WebcamCapture } from '../WebcamCapture/WebcamCapture';

const ImageClassifier = () => {
  const [predictions, setPredictions] = useState([]);
  const [isClassifying, setIsClassifying] = useState(false);

  const classifyImg = () => {
    setIsClassifying(true);
    // MobileNet is a pretrained model
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

    function modelLoaded() {
      console.info(classifier);
      console.log('Model Loaded!');
    }

    const image = document.getElementById('image');
    // Make a prediction with a selected image
    classifier.predict(image, 5, function (err, results) {
      return results;
    })
      .then((results) => {
        setIsClassifying(false);
        setPredictions(results);
      })
  }

  const renderPredictions = () => {
    if (predictions.length > 0) {
      return (
        <div className="predictions">
          <ul>
            {predictions.map((pred, i) => {
            let { label, confidence } = pred;
            // round the confidence with 2 decimal
            confidence = Math.floor(confidence * 10000) / 100 + "%";
            return <li key={i + ""}>{i + 1}. Prediction: {label} at {confidence}</li>
            })}
        </ul>
      </div>
    )}
  }

  const renderLoader = () => {
    return (<div className="loader"></div>);
  }

  return (
    <div className="ImageClassifier">
      <WebcamCapture postCaptureCb={classifyImg} />
      { isClassifying ? renderLoader() : renderPredictions() }
    </div>
  );
}

export default ImageClassifier;