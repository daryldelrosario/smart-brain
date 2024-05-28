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
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

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
    setIsProcessing(false);
  }

  useEffect(() => {
    const fetchImageRegions = () => {
      if(imageURL.trim() !== "") {
        setIsProcessing(true);
        fetch("http://localhost:3001/clarifai", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ imageURL: imageURL })
        })
          .then(response => {
            if(!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(regions => {
            if(regions && regions.length > 0) {
              calcFaceLocation(regions);
              setFaceDetected(true);
            } else {
              setFaceDetected(false);
              setRegions([]);
              setIsProcessing(false);
            }
          })
          .catch(error => {
            console.error(error);
            setFaceDetected(false);
            setRegions([]);
            setIsProcessing(false);
          })
          
      }
    };

    fetchImageRegions();
  }, [imageURL]);

  const onButtonSubmit = () => {
    setImageURL(input);

    if(input) {
      setRegions([]);
      setFaceDetected(true);
      setIsProcessing(true);
      fetch("http://localhost:3001/image", {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: user.id
        })
      })
        .then(response => {
          if(!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
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
              isProcessing={isProcessing}
            />
          </>
        } />
      </Routes>
      
    </div>
  );
}

export default App;
