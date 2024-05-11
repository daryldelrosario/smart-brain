import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, regions }) => {

  // console.log(regions[0].region.topPx);
  // console.log(regions[0].region.rightPx);
  // console.log(regions[0].region.btmPx);
  // console.log(regions[0].region.leftPx);

  console.log('FaceRecognition', regions);
  console.log(regions[0].topPx);
  console.log(regions[0].rightPx);
  console.log(regions[0].btmPx);
  console.log(regions[0].leftPx);

  return(
    <div className="center ma">
      <div className="img-container">
        {!!imageURL && (
          <div>
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