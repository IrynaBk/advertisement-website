import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/login');
  }

  return (
    <div className="navbar">
      <a className="navbar-brand" href="index.html"><img src="../src/assets/megaphone.png" alt="Site Icon"/></a>
      <a id="username-label" className="username-label" href=""></a>
      <button id="logout-button" className="btn btn-warning" type="button">Logout</button>
      <button id="login-button" className="btn btn-warning" type="button" onClick={handleClick}>Login</button>
      <form className="search-form">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-warning" type="button">Search</button>
      </form>
    </div>
  );
}

export default Navbar;
