import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../src/assets/edit.scss";
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Footer from './Footer';



function EditUser() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });


  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios(
        `http://127.0.0.1:3000/users/${id}`
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
    console.log(user);
   
    const fields = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
  // Compare the updated user object with the original user object
    axios.put(`http://127.0.0.1:3000/users/${user.id}`, fields)
      .then(response => {
        console.log(response.data);
        // Navigate to user profile page
        navigate(`/users/${id}`);      })
      .catch(error => {
        console.log(error);
      });
    }
  return (
    user?
    <>
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
