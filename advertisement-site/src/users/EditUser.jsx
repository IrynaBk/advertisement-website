import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./edit.scss";
import { Link } from 'react-router-dom';
import Loading from '../shared/Loading';
import Footer from '../shared/Footer';
import ErrorHandler from '../shared/ErrorHandler';
import AxiosClient from '../AxiosClient';
import { act } from 'react-dom/test-utils';



function EditUser() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });


  useEffect(() => {
    const getUser = async () => {
      const { data } = await AxiosClient.get(
        `/users/${id}`
      )
      let userJson  = JSON.parse(data["user"]);
        setUser(userJson);
    }
    getUser()
  },[]);


  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const fields = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
    AxiosClient.put(`/users/${id}`, fields)
      .then(response => {
        navigate(`/users/${id}`);      })
      .catch(error => {
        act(() => {
          setError(error.message);
        });
      });
    }
  return (
    user?
    <>
    {error && <ErrorHandler error={error} />}
    <div className='edit-container'>
    <div className="container">
      <div className="auth-form login-form">
        <Link to={`/users/${id}`}>« Back to Profile</Link>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">Edit First Name:</label>
            <input
              type="text"
              id="first-name"
              name="first_name"
              value={user.first_name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Edit Last Name:</label>
            <input
              type="text"
              id="last-name"
              name="last_name"
              value={user.last_name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Edit Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || ''}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Edit Profile
          </button>
        </form>
      </div>
    </div>
    </div>
      <Footer></Footer>
      </>

    : <Loading></Loading>
  );
}

export default EditUser;
