import { useState } from "react";
import "./SignIn.css";

const SignIn = ({ setIsSignedIn, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");


  // const handleSignIn = (e) => {
  //   e.preventDefault();
  //   setIsSignedIn("home");
  // }
  const handleRegisterClick = () => {
    setIsSignedIn("register");
  }

  const onSignInSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/signin", {
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
          alert("Email and/or Password is incorrect");
        }
      })
  }

  return (
    <>
      <article className="br3 ba b--black-10 mv4 w-100 w-75-m w-50-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={onSignInSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" for="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <p 
                className="f6 link dim black db"
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