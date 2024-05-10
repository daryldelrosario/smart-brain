const FaceRecognition = ({ imageURL }) => {
  return(
    <div className="center">
      <img src={imageURL} alt="user input image" />
    </div>
  )
}

export default FaceRecognition;