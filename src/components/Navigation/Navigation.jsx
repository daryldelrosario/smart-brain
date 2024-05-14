import "./Navigation.css";
import Logo from "../Logo/Logo";

const Navigation = () => {
  return(
    <nav className="nav">
      <Logo />
      <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
    </nav>
  );
};

export default Navigation;