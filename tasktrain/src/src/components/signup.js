import { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "../styles/form.css";
import { apiHost } from "../variables";

function SignupForm() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [registered, setRegistered] = useState(false);

  // password visibility

  const [isPasswordVisible, setVisible] = useState(false);

  let visibility_icon = isPasswordVisible ? "visibility_off" : "visibility";
  let input_type = isPasswordVisible ? "text" : "password";

  function togglePasswordVisibilty() {
    if (!isPasswordVisible) {
      setVisible(true);
    } else setVisible(false);
  }

  //   confirmation password visibility

  const [isPasswordConfirmationVisible, setConfirmatioVisible] =
    useState(false);

  let confirmation_visibility_icon = isPasswordConfirmationVisible
    ? "visibility_off"
    : "visibility";
  let confirmation_input_type = isPasswordConfirmationVisible
    ? "text"
    : "password";

  function toggleConfirmationPasswordVisibilty() {
    if (!isPasswordConfirmationVisible) {
      setConfirmatioVisible(true);
    } else setConfirmatioVisible(false);
  }

  // input states

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  let handleNameInput = (name) => {
    setName(name);
  };

  let handleEmailInput = (email) => {
    setEmail(email);
  };

  let handlePasswordInput = (password) => {
    setPassword(password);
  };

  let handlePasswordConfirmationInput = (password) => {
    setPasswordConfirmation(password);
  };



  // HANDLE SIGNING UP




  let handleSignUp = () => {

    let userObj = {
      username,
      email,
      password,
    };

    if (password !== passwordConfirmation) {
      document.getElementById("password-error").style.visibility = "visible";
    } else {
      setIsSignedUp(true);
      fetch(`${apiHost}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
      }).then((response) => {
        if (response.ok) {
          setIsSignedUp(false)
          setRegistered(true)
        } 
        else if (!response.ok)
        {
          setIsSignedUp(false)
          return response.json().then((error) => {

            console.error(error);

            let errorMessage;

            if(error.data.length === 1){
                 errorMessage = error.data[0]
                 if(errorMessage.includes("Email"))
                 {
                  document.getElementById("email-error-container").innerHTML = errorMessage
                 }
                 else if(errorMessage.includes("Username")){
                  document.getElementById("name-error-container").innerHTML = errorMessage
                  }
             }
            else
             if(error.data.length > 1){
                  let password_err = '';
                  let username_err = '';
                  let email_err = '';
                   error.data.map((errMsg)=>{
                    if(errMsg.includes("Username")){
                      return username_err = errMsg;
                    }
                    if(errMsg.includes("Email")){
                     return email_err = errMsg;
                    }
                   if(errMsg.includes("Password")){
                     return password_err = errMsg;
                    }
                   })
                   document.getElementById("email-error-container").innerHTML = email_err;
                   document.getElementById("name-error-container").innerHTML = username_err;
                   document.getElementById("password-error-container").innerHTML = password_err;

               }
          });
        }
      });
    }
  };


  // if registered redirect to login page

  if(registered){
    return <Redirect exact to="/" />
  }


  // REMOVE ERROR MESSAGE

  let removeErrorMessage = (id) => {
    document.getElementById(`${id}`).innerHTML = '';
  }


  return (
    <main className="form-container">
      <form>
        {" "}
        <h1 className="form-title">Sign Up</h1>
        <div className="form-group">
          <input
            onChange={(e) => {
              removeErrorMessage("name-error-container")
              handleNameInput(e.target.value);
            }}
            type="text"
            name="name"
            value={username}
            placeholder="..."
            required
          />
          <label for="name" className="label-name">
            <span className="content-name">Name</span>
          </label>
          <div className="verification-icon-cont"></div>
          <div className="error-msg-container">
            <h6 id="name-error-container"></h6>
          </div>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => {
              removeErrorMessage("email-error-container")
              handleEmailInput(e.target.value);
            }}
            type="email"
            name="name"
            value={email}
            placeholder="..."
            required
          />
          <label for="name" className="label-name">
            <span className="content-name">Email</span>
          </label>
          <div className="verification-icon-cont"></div>
          <div className="error-msg-container">
            <h6 id="email-error-container"></h6>
          </div>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => {
              removeErrorMessage("password-error-container")
              handlePasswordInput(e.target.value);
            }}
            type={input_type}
            name="name"
            value={password}
            placeholder="..."
            required
          />
          <label for="name" className="label-name">
            <span className="content-name">Password</span>
          </label>
          <div
            onClick={() => {
              togglePasswordVisibilty();
            }}
            className="visibility-icon-cont"
          >
            <i className="material-icons">{visibility_icon}</i>
          </div>
          <div className="error-msg-container">
            <h6 id="password-error-container"></h6>
          </div>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => {
              removeErrorMessage("confirm-pass-error")
              handlePasswordConfirmationInput(e.target.value);
            }}
            type={confirmation_input_type}
            name="name"
            value={passwordConfirmation}
            placeholder="..."
            required
          />
          <label for="name" className="label-name">
            <span className="content-name">Confirm password</span>
          </label>
          <div
            onClick={() => {
              toggleConfirmationPasswordVisibilty();
            }}
            className="visibility-icon-cont"
          >
            <i className="material-icons">{confirmation_visibility_icon}</i>
          </div>
          <div id="password-error">
            <h6 id="confirm-pass-error">Password does not match</h6>
          </div>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" required />
          <h5>I Agree with privacy and policy</h5>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="form-button"
        >
          SIGN UP
          {isSignedUp && (
            <div className="loader-container">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
          )}
        </button>
        <h4 className="redirect-msg">
          Already have an account?
          <NavLink className="span" exact to="/">
            <span>Sign in</span>
          </NavLink>
        </h4>
      </form>
    </main>
  );
}

export default SignupForm;
