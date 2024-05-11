import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, regions, faceDetected }) => {

  console.log(faceDetected);
  console.log(regions);

  return(
    <div className="center ma">
      <div className="img-container">
        {!!imageURL && (
          <div>
            {!faceDetected ? (
              <div className="overlay">
                 <p>No Faces Detected</p> 
              </div>
            ) : null}

            <img id="inputImg" src={imageURL} alt="check for face recognition" className="img" /> 
            {regions.map((region, index) => (
              <div
                key={index}
                className="bounding-box"
                style={{
                  top: region.topPx,
                  right: region.rightPx,
                  bottom: region.btmPx,
                  left: region.leftPx,
                }}  
              ></div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  )
}

export default FaceRecognition;