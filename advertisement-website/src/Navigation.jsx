import React from 'react';
import { useNavigate,  Link } from 'react-router-dom';
import { useState } from 'react';
import "../src/assets/_navbar.scss"


function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  let userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/advertisements?search=${searchTerm}`);
  };

  const logout =() => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="navbar">
      <Link to={`/`} className="navbar-brand">
      <img src="../src/assets/megaphone.png" alt="Site Icon"/>
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
