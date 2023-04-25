import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../src/assets/Login.scss"
import axios from 'axios';
import { red } from '@mui/material/colors';


async function loginUser(credentials) {
  const json_data = JSON.stringify(credentials);
  console.log(json_data);

  try {
    const response = await axios.post('http://127.0.0.1:3000/login', json_data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

   async function registerUser(credentials) {
    const json_data = JSON.stringify(credentials)
    console.log(json_data)
    return fetch(' http://127.0.0.1:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json_data
    })
      .then(data => data.json())
   }
  
function Signup() {
    const navigate = useNavigate()
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password_confirmation, setPasswordConfirmation] = useState();


  
    const handleSubmit = async e => {
      e.preventDefault();
        const responseReq = await registerUser({
            username,
            password, 
            password_confirmation,
            email,
            first_name,
            last_name
        });
      const response = await loginUser({
        username,
        password
      });
      if ('token' in response) {
           localStorage.setItem('token', response['token']);
           localStorage.setItem('user', response['user']);
           return navigate("/advertisements");
  
      } else {
        console.log("Failed", response.message, "error");
      }
    }
  

    return (
        <div className='authPage'>
        <div className="container">
        <form className="auth-form login-form" onSubmit={handleSubmit}>
      
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" 
                   onChange={e => setUserName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" name="first-name" placeholder="Enter first name" onChange={e => setFirstName(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" name="last-name" placeholder="Enter last name" onChange={e => setLastName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input type="password" id="passwordConfirmation" name="passwordConfirmation" placeholder="Enter password again" onChange={e => setPasswordConfirmation(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary"  >Sign Up</button>
          <p className="signup-link">Already have an account? <Link to={`/login`}>
          Login
            </Link></p>
        </form>
      </div>
      </div>
    );
  }

  export default Signup;
