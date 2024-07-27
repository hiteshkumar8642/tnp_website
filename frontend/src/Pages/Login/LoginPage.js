import React from "react";
import Header from "../../Components/Header/Header";
import "./LoginPage.css";
import { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ onLogInPageClosing, onSignUpPageOpening }) {
  // const[logindata,setlogindata]=useState([]);
  // useEffect(()=>{
  // axios.get("")

  // },[])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const submit = async e => {
      e.preventDefault();
      const user = {
            username: username,
            password: password
          };
      // Create the POST requuest
      const data = await                                                                            
                    axios.post('http://localhost:8000/user/api/login/',
                    username , password
                    );

    // Initialize the access & refresh token in localstorage.      
    localStorage.clear();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    axios.defaults.headers.common['Authorization'] = 
                                    `Bearer ${data['access']}`;
    
    console.log("hii")
                                    window.location.href = '/'

  }
  function handleSubmit() {}
  return (
    <>
      <Header onLogInPageOpening={onLogInPageClosing} isLoginPage>
        <Link to="/">
          <button className="nav-button">Back To Home</button>
        </Link>
      </Header>
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={submit}>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" required 
                onChange={e => setUsername(e.target.value)}
              />

            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required 
              onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </form>
          <p className="register-link">
            <span className="register-link-button">Forgot Password?</span>
          </p>
          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/signup">
              <span
                className="register-link-button"
                onClick={onSignUpPageOpening}
              >
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
