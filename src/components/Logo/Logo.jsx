import Tilt from "react-parallax-tilt";
import "./Logo.css";
import logo from "../../assets/logo.png";

const Logo = ({ setIsSignedIn, setImageURL }) => {

  const handleClick = () => {
    setIsSignedIn(false);
    setImageURL("");
  }

  return(
    <div className="logo" onClick={handleClick}>
      <Tilt 
        className="br2 shadow-2 tilt pointer pa3"
      >
        <img src={logo} alt="transparent brain logo" />
      </Tilt>
    </div>

  );
};

export default Logo;