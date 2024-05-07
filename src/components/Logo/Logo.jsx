import Tilt from "react-parallax-tilt";
import "./Logo.css";

const Logo = () => {
  return(
    <div className="ma4 mt0">
      <Tilt className="br2 shadow-2 tilt">
        <div>
          <h1>React Parallax Tilt 👀</h1>
        </div>
      </Tilt>
    </div>

  );
};

export default Logo;