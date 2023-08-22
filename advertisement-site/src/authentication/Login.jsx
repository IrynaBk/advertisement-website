import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./Login.scss"
import ErrorHandler from '../shared/ErrorHandler';
import AxiosClient from '../AxiosClient';


  
function Login() {
  // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    const navigate = useNavigate()
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);



    async function loginUser(credentials) {
      const json_data = JSON.stringify(credentials);
    
      try {
        const response = await AxiosClient.post('/login', json_data);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
      
  
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        const response = await loginUser({
          username,
          password
        });
    
        if ('token' in response) {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('user', response['user']);
          return navigate('/advertisements');
        } else {
          console.log('Failed', response.message, 'error');
        }
      } catch (error) {
        setError(error);
      }
    };
  

    return (<>
      {error && <ErrorHandler error={error} />}
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
          <Link to={`/reset_password`}>
          Forgot password?
            </Link>
        </form>
      </div>
      </div>
      </>
    );
  }

  export default Login;
