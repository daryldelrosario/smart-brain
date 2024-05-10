import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL }) => {
  return(
    <div className="center ma">
      <div className="img-container">
        {!!imageURL && (
          <img src={imageURL} alt="user input image" className="img" /> 
        )}
      </div>
      
    </div>
  )
}

export default FaceRecognition;