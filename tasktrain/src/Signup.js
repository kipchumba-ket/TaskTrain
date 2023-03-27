import { useState, useEffect } from "react";
import { Watch } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("gotologin");
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const userSignup = (e) => {
    e.preventDefault();
    localStorage.removeItem("gotologin");
    setLoading(true);
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === 1) {
          setWrongPass(true);
        } else {
          localStorage.setItem("gotologin", 2);
          navigate("/login");
          setName("");
          setEmail("");
          setPassword("");
          
        }
        setLoading(false);
      });
  };

  return (
    <div style={mainDiv}>
      <h2>Signup Form</h2>
      <div style={inputFields}>
        {loading && (
          <Watch heigth="100" width="100" color="#a866c4" ariaLabel="loading" />
        )}
        {wrongPass && (
          <h3 style={wrongPassStyle}>
            Both Passwords must be same for Signup
          </h3>
        )}
        <form onSubmit={userSignup}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={inputField}
            name="name"
            placeholder="Enter name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={inputField}
            name="email"
            placeholder="Enter email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={inputField}
            name="password"
            placeholder="Enter password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            style={inputField}
            name="confirmpassword"
            placeholder="confirm password"
          />
          <input type="submit" style={submitBtn} value="Signup" />
        </form>
      </div>
    </div>
  );
};

const inputField = {
  padding: "5px",
  margin: "10px 0px",
  display: "flex",
  width: "75%",
  fontSize: "17px",
};

const inputFields = {
  display: "flex",
    flexDirection: "column"
}

const wrongPassStyle = {
    color: "red",
    backgroundColor: "#fab9c6",
    fontWeight: "bold",
    borderRadius: "12px",
    padding: "15px"
}

const submitBtn = {
    padding: "12px 0px",
    width: "7rem",
    fontSize: "17px",
    borderRadius: "8px",
    border: "none",
    color:"white",
    fontWeight:"bold",
    margin: "20px 5px",
    backgroundColor: "#a866c4"
}

const mainDiv = {
    padding:"18px",
    border:"2px solid black",
    margin:"5%",
    borderRadius:"15px"
}
