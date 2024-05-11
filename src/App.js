import { useState, useEffect } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesBg from 'particles-bg';
import './App.css';


function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [regions, setRegions] = useState([]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const calcFaceLocation = (dataSet) => {
    const img = document.getElementById("inputImg");
    const imgWidth = Number(img.width);
    const imgHeight = Number(img.height);
    console.log(imgWidth, imgHeight);

    const newRegions = dataSet.map(data => {
      const theBox = data.region_info.bounding_box;
      const topRow = theBox.top_row;
      const leftCol = theBox.left_col;
      const btmRow = theBox.bottom_row;
      const rightCol = theBox.right_col;

      console.log(`topRow: ${topRow}, leftCol: ${leftCol}, btmRow:  ${btmRow}, rightCol: ${rightCol}`);

      const topPxNum = Number((topRow * imgHeight).toFixed(3));
      const leftPxNum = Number((leftCol * imgWidth).toFixed(3));
      const btmPxNum = Number(imgHeight - (btmRow * imgHeight).toFixed(3));
      const rightPxNum = Number(imgWidth - (rightCol * imgWidth).toFixed(3));

      const pixelValues = {
        topPx: topPxNum + "px",
        leftPx: leftPxNum + "px",
        btmPx: btmPxNum + "px",
        rightPx: rightPxNum + "px",
      }
      
      return pixelValues;
    });

    setRegions(newRegions);
  }

  useEffect(() => {
    const fetchImageRegions = () => {
      if(imageURL.trim() !== "") {
        const PAT = '4cefee143f5545ed861ae3abf80dff2b';
        const USER_ID = 'clarifai';
        const APP_ID = 'main';
        const MODEL_ID = 'face-detection';
        const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  
        const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": imageURL
                      }
                  }
              }
          ]
        });
  
        const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
        };
  
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
          .then(response => response.json())
          .then(result => {
  
            const regions = result.outputs[0].data.regions;
            calcFaceLocation(regions);
          })
          .catch(error => console.log('error', error));
      }
    };

    fetchImageRegions();
  }, [imageURL]);

  const onButtonSubmit = () => {
    setImageURL(input);
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" color="#F5F5F5" num={33} bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageURL={imageURL} regions={regions} />
    </div>
  );
}

export default App;
