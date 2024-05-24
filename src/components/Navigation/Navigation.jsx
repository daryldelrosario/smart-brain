import "./Navigation.css";
import Logo from "../Logo/Logo";

const Navigation = ({ isSignedIn, setIsSignedIn, setImageURL }) => {
  const handleSignOut = (e) => {
    e.preventDefault();
    setIsSignedIn(false);
    setImageURL("");
  }

  return(
    <nav className="nav">
      <Logo 
        setIsSignedIn={setIsSignedIn}  
        setImageURL={setImageURL}
      />
      {isSignedIn === "home" && (
        <p 
        className="f3 link dim black underline pa3 pointer"
        onClick={handleSignOut}
        >Sign Out</p>
      )}
    </nav>
  );
};

export default Navigation;