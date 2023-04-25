import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  "../src/assets/AdPage.scss"
import Navbar from './Navigation.jsx';
import Loading from './Loading';
import Footer from './Footer';


function AdPage() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  const { id } = useParams();
  // Getter and setter for user state
  const [ad, setAd] = useState(null)
  const [curUser, setCurUser] = useState(null)

  const navigate = useNavigate()
    const handleDelete = async () => {
      

      try {
        await axios.delete(`http://127.0.0.1:3000/advertisements/${id}`);
        navigate("/advertisements");
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    const getAd = async () => {
      const { data } = await axios(
        `http://127.0.0.1:3000/advertisements/${id}`
      )
        console.log(data["advertisement"]);
        let adJson = JSON.parse(data["advertisement"]);
        console.log(adJson)
        setAd(adJson);
        setCurUser(data["is_curr_user"]);
        console.log(curUser);

    }
    console.log("I'm here")

    getAd()
  },[curUser]);
  


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
            {curUser?<>
            <button id = "edit-button" className="det-button edit" >
            Edit
          </button>
          <button id ="delete-button" className="det-button delete" onClick={handleDelete} >
          Delete
        </button>
          </>
          :
            <button className="det-button details" >
              go to chat
            </button>
}
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <Footer></Footer>
  </>
    : <Loading></Loading>
  );
}
export default AdPage;