import React from 'react';
import axios from 'axios';
import { useNavigate,  Link } from 'react-router-dom';
import { useState } from 'react';
import "./_navbar.scss";
import logo from "../assets/megaphone.png";
import AxiosClient from '../AxiosClient';


function Navbar() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  let userString = localStorage.getItem('user');
  const user = JSON.parse(userString);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/advertisements?search=${searchTerm}`);
  };

  const logout = async () => {
    try {
      localStorage.clear();
      await AxiosClient.delete('/logout');
      navigate('/');
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div className="navbar">
      <Link to={`/`} className="navbar-brand">
      <img src={logo} alt="Site Icon"/>
      </Link>
      {user?<Link to={`/users/${user.id}`} id="username-label" className="username-label">
      {user.username}
      </Link>:<></>}
      <div className='nav-content'>
      {
      user? <>
      <button id="logout-button" className="btn btn-warning" type="button" onClick={logout}>Logout</button>
      </>
      : <div id="login-button"><Link to={`/login`} id="login" className="login-link">
      Login
      </Link></div>
      } 
      <form className="search-form" onSubmit={handleSearch}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className="btn btn-warning" type="submit">Search</button>
      </form>
      </div>
    </div>
  );
}

export default Navbar;
