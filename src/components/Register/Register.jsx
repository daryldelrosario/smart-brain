import { useState } from "react";

const Register = ({ setIsSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSignedIn("home");
  }

  const handleSignInClick = () => {
    setIsSignedIn(false);
  }

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name  
      })
    })
      .then(response => response.jsion())
      .then(user => {
        if(user) {
          
        }
      })
  }

  return (
    <>
      <article className="br3 ba b--black-10 mv4 w-100 w-75-m w-50-l mw6 shadow-5 center">
        <main className="pa3 black-80">
          <form className="measure" onSubmit={handleRegister}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Registration</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" for="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name" 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" for="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={(e) => setPassword(e.target.value)}  
                />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
            </div>
            <div className="lh-copy mt3">
              <p 
                className="f6 link dim black db"
                onClick={handleSignInClick}
              >Sign In</p>
            </div>
          </form>
        </main>
      </article>
    </>
  );
}

export default Register;