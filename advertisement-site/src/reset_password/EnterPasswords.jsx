import React, { useState } from 'react';
import ErrorHandler from '../shared/ErrorHandler';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './resetPassword.scss';
import AxiosClient from '../AxiosClient';

export default function EnterPasswords() {
  const [error, setError] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();
  const [alert, setAlert] = useState();

  const { token } = useParams()

  const handleSubmit = async e => {
    e.preventDefault();
    const json_data = JSON.stringify({password, password_confirmation});    
      try {
        const response = await AxiosClient.put(`/reset_password/${token}`, json_data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setAlert("Successfully changed!");
        console.log(response)
        return response.data;
      } catch (error) {
        console.log(error)
        setError(error.message);
      }
  }

  return (
    <>
    {alert && <> <div className="alert alert-success" role="alert" style={{ marginBottom: 0 }}>
      {alert}
    </div></>}
    {error && <ErrorHandler error={error} />}
    <div className='resetPassword'>
      <div className="container">
      <form className="auth-form email-form" onSubmit={handleSubmit}>
      <Link to={'/login'}>back to login</Link>
        <h1>Enter your new password</h1>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input type="password" id="passwordConfirmation" name="password_confirmation" placeholder="Enter password again" onChange={e => setPasswordConfirmation(e.target.value)} />
          </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
    </>
  )
}
