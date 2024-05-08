import "./ImageLinkForm.css";

const ImageLinkForm = () => {

  return(
    <div className="image-form-container">
      <p className="f3 pa3">
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className="pa4 br3 shadow-5 image-form-input">
        <input className="f4 pa2 w-70 center" type="text" />
        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer">Detect</button>
      </div>
    </div>

  );
};

export default ImageLinkForm;