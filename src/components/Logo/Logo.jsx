import Tilt from "react-parallax-tilt";
import "./Logo.css";
import logo from "../../assets/logo.png";

const Logo = () => {
  return(
    <div className="ma4 mt0">
      <Tilt className="br2 shadow-2 tilt pointer pa3">
        <img src={logo} alt="transparent brain logo" />
      </Tilt>
    </div>

  );
};

export default Logo;