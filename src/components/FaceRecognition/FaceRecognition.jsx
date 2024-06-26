import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, regions, faceDetected, isProcessing }) => {

  return(
    <div className="center ma">
      <div className="img-container">
        {!!imageURL && (
          <div>
            {isProcessing && (
              <div className="overlay">
                <p>Checking Image ...</p>
              </div>
            )}
            {!faceDetected && !isProcessing && (
              <div className="overlay">
                 <p>No Faces Detected</p> 
              </div>
            )}

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