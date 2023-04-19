import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  "../src/assets/AdPage.scss"
import Navbar from './Navigation.jsx';

function AdPage() {

  const { id } = useParams();
  // Getter and setter for user state
  const [ad, setAd] = useState(null)

  useEffect(() => {
    const getAd = async () => {
      const { data } = await axios(
        `http://127.0.0.1:3000/advertisements/${id}`
      )

      setAd(data)
    }
    console.log("I'm here")

    getAd()
  },[]);
  
  console.log(ad)


  return (
    ad?
    <>
    <Navbar></Navbar>
    <div className='adPage'>
    <section className="ad-list">
    <div className="ad-container">
      <div id={`ad-${ad.id}`} className="ad">
        <div className="ad-main">
          <div className="image">
            <img src="../src/assets/loading.jpg" alt="loading..." />
          </div>
          <div className="info">
            <div className="title">{ad.title}</div>
            <div className="ad-location">
              <img src="../src/assets/pin.png" alt="location" />
              <p>{ad.location}</p>
            </div>
            <div className="ad-category">{ad.category}</div>
            <div className={"desc text"}>
              {ad.description}
            </div>
          </div>
        </div>
        <div className="owner">
          <div className="verticalLine"></div>
          <div className="owner-info">
            <div className="owner icon">
              <img src="../src/assets/person.svg" alt="Owner" />
            </div>
            <div className="text} name">
              {ad.user.first_name} {ad.user.last_name}
            </div>
            <button className="det-button details" >
              go to chat
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  </>
    : <div>Loading..</div>
  );
}
export default AdPage;