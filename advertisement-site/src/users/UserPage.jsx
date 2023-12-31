import axios from 'axios';
import Navbar from '../shared/Navigation.jsx';
import Loading from '../shared/Loading.jsx';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./profile.scss";
import Footer from '../shared/Footer.jsx';
import ErrorHandler from '../shared/ErrorHandler';
import AxiosClient from '../AxiosClient.jsx';




function UserPage() {
  const DEFAULT_S3_IMAGE_URL = 'https://advertisement-website.s3.eu-west-3.amazonaws.com/default.jpg'

  const [error, setError] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState(null)
  const [curUser, setCurUser] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await AxiosClient.get(`/users/${id}`);
        // console.log(data);
        // console.log(data["user"])
        let userJson = JSON.parse(data["user"]);
        setUser(userJson);
        setCurUser(data["is_curr_user"]);
      } catch (error) {
        setError(error.message);
      }
    }
    getUser()
  }, []);

  // console.log(user)
  
  return (
    user?
    <>
    {error && <ErrorHandler error={error} />}
    <section className="profile-sec">
      <div className="profile-container">
        <div className="content">
        <img src={user.image_url || DEFAULT_S3_IMAGE_URL} alt="Profile picture" />
          <div className="info">
            <h2>{user.first_name} {user.last_name}</h2>
            <h6>{user.username}</h6>
          </div>
          <div className="my-list">
            <Link to={`/advertisements?user_id=${user.id}`} className="button det-button ad-list">
              Advertisements
            </Link>
          </div>
          {curUser?
          <>
          <Link to={`/chat_rooms`}>
            My chats
          </Link>
          <div className="button-container">
            <Link to={`/users/edit/${user.id}`} className="btn button det-button edit">
              Edit
            </Link>
            <button type="submit" className="btn delete">Delete</button>
          </div></>
          : <></> }
        </div>
      </div>
    </section>
    <Footer></Footer>

    </>
    : <Loading></Loading>
  );
}

export default UserPage;