import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, regions }) => {

  console.log(regions);

  return(
    <div className="center ma">
      <div className="img-container">
        {!!imageURL && (
          <img id="inputImg" src={imageURL} alt="check for face recognition" className="img" /> 
        )}
      </div>
      
    </div>
  )
}

export default FaceRecognition;