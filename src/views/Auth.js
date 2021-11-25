import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

export const Auth = (props) => {
  const history = useHistory();
  const token = localStorage.getItem("accessToken");

  const [formState, setFormState] = useState({});
  const APIURL = "http://challenge-react.alkemy.org/";

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const reqBody = {
      email: formState.email,
      password: formState.password,
    };

    if (formState.email && formState.password) {
      axios
        .post(APIURL, reqBody)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("accessToken", res.data.token);
          }

          history.push("/");
        })
        .catch(() => console.log("invalid email or password"));
    }
  };

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  if (token) {
    history.push("/");
  }

  return (
    
<div className="login">
    
            <h1 class="Title">Login</h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Email
                    <input onChange={handleInputChange} class= "label" name="email" type="text" required/>
                </label>
                <label>
                    Password
                    <input onChange={handleInputChange} class= "label" name="password" type="password" required/>
                </label>

                <button type="submit" value="Login" className="submit-button" >
                    Login
                </button>
            </form>

        </div>
    )
}
