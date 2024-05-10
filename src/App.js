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
  // const [regionsData, setRegionsData] = useState([]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

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

          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              const topRow = boundingBox.top_row.toFixed(3);
              const leftCol = boundingBox.left_col.toFixed(3);
              const bottomRow = boundingBox.bottom_row.toFixed(3);
              const rightCol = boundingBox.right_col.toFixed(3);

              region.data.concepts.forEach(concept => {
                  // Accessing and rounding the concept value
                  const name = concept.name;
                  const value = concept.value.toFixed(4);

                  console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                  
              });
          });

        })
        .catch(error => console.log('error', error));
    }
  }

  useEffect(() => {
    fetchImageRegions();
  }, [imageURL]);

  const onButtonSubmit = () => {
    fetchImageRegions();

    // const IMAGE_URL = "https://images.inc.com/uploaded_files/image/1920x1080/getty_517194189_373099.jpg";
    // 'https://samples.clarifai.com/metro-north.jpg'


    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////





    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
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
      <FaceRecognition imageURL={imageURL}/>
    </div>
  );
}

export default App;
