import React, { useState } from 'react';
import ErrorHandler from '../shared/ErrorHandler';
import { useNavigate } from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import "./CreateAd.scss";

function CreateAd() {
  const navigate = useNavigate();
  const [advertisement, setAdvertisement] = useState({
    title: '',
    description: '',
    location: '',
    category: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setAdvertisement({
      ...advertisement,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AxiosClient
      .post('/advertisements', advertisement)
      .then(response => {
        // Handle successful response
        console.log(response.data);
        navigate('/'); // Redirect to the advertisements page
      })
      .catch(error => {
        setError(error);
      });
  };

  return (
    <div className='create-container'>
    <div className="container">
    <div className="auth-form login-form">

      <h1>Create Advertisement</h1>
      {error && <ErrorHandler error={error} />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={advertisement.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={advertisement.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            name="location"
            value={advertisement.location}
            onChange={handleChange}
          >
            <option value="">Select location</option>
            <option value="Lviv">Lviv</option>
            <option value="Rivne">Rivne</option>
            <option value="Ternopil">Ternopil</option>
            <option value="IvanoFrankivsk">IvanoFrankivsk</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={advertisement.category}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Advertisement
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default CreateAd;
