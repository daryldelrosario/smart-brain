import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ParticlesBg from 'particles-bg';
import './App.css';


function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [regions, setRegions] = useState([]);
  const [faceDetected, setFaceDetected] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  });

  const navigate = useNavigate();

  // USED TO TEST CONNECTION WITH smart-brain-api
  // useEffect(() => {
  //   fetch("http://localhost:3001/")
  //     .then(response => response.json())
  //     .then(console.log)
  // }, []);

  useEffect(() => {
    if(isSignedIn === "home") {
      navigate('/home');
    } else if(isSignedIn === "register") {
      navigate('/register');
    } else {
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const calcFaceLocation = (dataSet) => {
    const img = document.getElementById("inputImg");
    const imgWidth = Number(img.width);
    const imgHeight = Number(img.height);

    const newRegions = dataSet.map(data => {
      const theBox = data.region_info.bounding_box;
      const topRow = theBox.top_row;
      const leftCol = theBox.left_col;
      const btmRow = theBox.bottom_row;
      const rightCol = theBox.right_col;

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
    setFaceDetected(true);
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

            if(regions) {
              calcFaceLocation(regions);
            } else {
              setFaceDetected(false);
              setRegions([]);
            }
          })
          .catch(error => console.log('error', error));
      }
    };

    fetchImageRegions();
  }, [imageURL]);

  const onButtonSubmit = () => {
    setImageURL(input);

    if(input) {
      fetch("http://localhost:3001/image", {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          setUser(prevUser => ({
            ...prevUser,
            entries: count
          }));
        })
        .catch(err => {
          console.log("Error updating entries: ", err);
        })
    } else {
      alert("You should try putting an image url");
    }
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" color="#F5F5F5" num={33} bg={true} />
      <Navigation 
        setIsSignedIn={setIsSignedIn} 
        isSignedIn={isSignedIn}
        setImageURL={setImageURL}
      />
      <Routes>
        <Route 
          path="/" 
          element={<SignIn 
            setIsSignedIn={setIsSignedIn}
            loadUser={loadUser} />} 
        />
        <Route 
          path="/register" 
          element={<Register 
            setIsSignedIn={setIsSignedIn} 
            loadUser={loadUser} />} 
        />
        <Route path="/home" element = {
          <>
            <Rank 
              name={user.name}
              entries={user.entries}
            />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition 
              imageURL={imageURL}
              regions={regions}
              faceDetected={faceDetected}
            />
          </>
        } />
      </Routes>
      
    </div>
  );
}

export default App;
