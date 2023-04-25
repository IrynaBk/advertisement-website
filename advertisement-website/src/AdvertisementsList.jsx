import React, { useState, useEffect } from 'react';
import Advertisement from './Advertisement';
import { Link, useLocation  } from 'react-router-dom';
import axios from 'axios';
import "../src/assets/AdvertisementsList.scss";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Navbar from './Navigation.jsx';
import Loading from './Loading';
import ErrorHandler from './ErrorHandler';
import Footer from './Footer';



function AdvertisementsList() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  const [advertisements, setAdvertisements] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState('all');
  const [category, setCategory] = useState('all');

  const locationSearch = useLocation().search;
  const searchParams = new URLSearchParams(locationSearch);
  const searchTerm = searchParams.get('search');
  const userId = searchParams.get('user_id');


  useEffect(() => {
    // Make a request to the server to retrieve the filtered and paginated data
    async function fetchData() {
      const response = await axios.get('http://127.0.0.1:3000/advertisements', {
        params: {
          location: location,
          category: category,
          page: currentPage,
          search: searchTerm,
          user_id: userId
        }
      }).catch(error => {
        console.error(error);
        <ErrorHandler error={error.message}></ErrorHandler>
      });
      setAdvertisements(response.data);
      setTotalPages(Number(response.headers.get('total-pages')));
    }

    fetchData();
  }, [location, category, currentPage, searchTerm, userId]);

  function handleLocationChange(event) {
    setLocation(event.target.value);
    setCurrentPage(1);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
    setCurrentPage(1);
  }

  function handlePageChange(event) {
    setCurrentPage(Number(event.target.textContent));
    window.scrollTo({top: 0});
  }



  return (
    advertisements?
    <>
    <Navbar></Navbar>
    <div className='AdMainPage'>
    <section className="ad-list">
      <h1>Advertisements</h1>
      <div className="filter-container">
        <div className="filter categories">
        <select name="category" id="category" value={category} onChange={handleCategoryChange}>
            <option value="all">All categories</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <div className="filter locations">
        <select name="location" id="location" value={location} onChange={handleLocationChange}>
            <option value="all">All locations</option>
            <option value="Lviv">Lviv</option>
            <option value="Rivne">Rivne</option>
            <option value="Ternopil">Ternopil</option>
            <option value="IvanoFrankivsk">IvanoFrankivsk</option>
          </select>
        </div>
        {localStorage.getItem('token') != null && (
  <Link to={`/advertisements/create`} id="create-ad-button" className="btn btn-warning" style={{height: "48px"}}>
    Create advertisement
  </Link>
)}
      </div>
    
      <div id="ad-container" className="ad-container">
        {advertisements.length == 0? <div className='no-results'>No results :(</div>
        : <>
        {advertisements.map(ad => (
          <Advertisement key={ad.id} ad={ad} />
        ))}</>}
      </div>
    </section>
    <div style={{ display: 'flex', justifyContent: 'center' ,backgroundColor: '#dfe6e9', padding: '5px' }}>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
    </div>
    </div>
    <Footer></Footer>

    </>
    : <Loading></Loading>
  );
}

export default AdvertisementsList;
