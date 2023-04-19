import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../src/assets/Login.scss"


async function loginUser(credentials) {
    const json_data = JSON.stringify(credentials)
    console.log(json_data)
    return fetch(' http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json_data
    })
      .then(data => data.json())
   }
  
function Login() {
    const navigate = useNavigate()
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const response = await loginUser({
        username,
        password
      });
      if ('token' in response) {
           localStorage.setItem('token', response['token']);
          localStorage.setItem('user', JSON.stringify(response['user']));
          return navigate("/advertisements");
  
      } else {
        console.log("Failed", response.message, "error");
      }
    }
  

    return (
        <div className='authPage'>
        <div className="container">
        <form className="auth-form login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" 
                   onChange={e => setUserName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary"  >Login</button>
          <p className="signup-link">Don't have an account? <Link to={`/signup`}>
          Sign Up
            </Link></p>
        </form>
      </div>
      </div>
    );
  }

  export default Login;
