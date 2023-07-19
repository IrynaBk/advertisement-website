import axios from 'axios';
import React, { useState } from 'react';
import ErrorHandler from '../shared/ErrorHandler';
import './resetPassword.scss';
import AxiosClient from '../AxiosClient';


export default function EnterEmail() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    const [email, setEmail] = useState();
    const [error, setError] = useState();

    const [alert, setAlert] = useState();

    const handleSubmit = async e => {
      e.preventDefault();
    
      try {
        const response = await AxiosClient.post('/reset_password', {
          email: email
        });
        setAlert("Email sent! Check your gmail, please");
      } catch (error) {
        setError(error);
      }
    }

  return (
    <>
      {error && <ErrorHandler error={error} />}
      {alert && <> <div className="alert alert-success" role="alert" style={{ marginBottom: 0 }}>
      {alert}
    </div></>}
      <div className='resetPassword'>
        <div className="container">
        <form className="auth-form email-form" onSubmit={handleSubmit}>
          <h1>Enter your email</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      </div>
      </>
  )
}
