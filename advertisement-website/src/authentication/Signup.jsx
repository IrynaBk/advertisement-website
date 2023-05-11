import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./Login.scss"
import Form from './Form';

   
  
function Signup() {
    const navigate = useNavigate()


    return (
        <div className='authPage'>
        <div className="container">
        <Form navigation = {navigate} />
      </div>
      </div>
    );
  }

  export default Signup;
