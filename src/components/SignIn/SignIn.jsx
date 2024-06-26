import { useState, useRef } from "react";
import "./SignIn.css";

const SignIn = ({ setIsSignedIn, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const emailInputRef = useRef(null);


  // const handleSignIn = (e) => {
  //   e.preventDefault();
  //   setIsSignedIn("home");
  // }
  const handleRegisterClick = () => {
    setIsSignedIn("register");
  }

  const onSignInSubmit = (e) => {
    e.preventDefault();
    fetch("https://smartbrain-recognition-api.vercel.app/signin", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user.id) {
          loadUser(user);
          setIsSignedIn("home");
        } else {
          alert("Incorrect Login / Password");
          setSignInEmail("");
          setSignInPassword("");
          emailInputRef.current.focus();
        }
      })
  }

  return (
    <>
      <article className="br3 ba b--black-10 mv4 w-100 w-75-m w-50-l mw6 shadow-5 center">
        <main className="pa4 white-80">
          <form className="measure" onSubmit={onSignInSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 gray" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange={(e) => setSignInEmail(e.target.value)}
                  value={signInEmail}
                  ref={emailInputRef}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" for="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 gray"
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={(e) => setSignInPassword(e.target.value)}
                  value={signInPassword}
                />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <p 
                className="f6 link dim white db"
                onClick={handleRegisterClick}
              >Register</p>
            </div>
          </form>
        </main>
      </article>
    </>
  );
}

export default SignIn;