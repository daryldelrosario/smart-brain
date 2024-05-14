import "./Navigation.css";
import Logo from "../Logo/Logo";

const Navigation = ({ isSignedIn, setIsSignedIn }) => {
  const handleSignOut = (e) => {
    e.preventDefault();
    setIsSignedIn(false);
  }

  return(
    <nav className="nav">
      <Logo />
      {isSignedIn && (
        <p 
        className="f3 link dim black underline pa3 pointer"
        onClick={handleSignOut}
        >Sign Out</p>
      )}
    </nav>
  );
};

export default Navigation;