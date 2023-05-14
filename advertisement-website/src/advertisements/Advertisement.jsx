import React from "react";

import { Link } from 'react-router-dom';

import locationPin from "../assets/pin.png";
import adPicture from "../assets/loading.jpg";
import person from "../assets/person.svg";


function Advertisement({ ad }) {
  return (
    <div id={`ad-${ad.id}`} className="ad">
      <div className="content">
        <div className="title">{ad.title}</div>
        <div className="image">
          <img src={adPicture} alt="loading..." />
        </div>
        <div className="ad-location">
          <img src={locationPin} alt="location" />
          <p>{ad.location}</p>
        </div>
        <div className="text">
          {ad.description.substring(0, 37)}...
        </div>
      </div>
      <Link to={`/advertisements/${ad.id}`} className="button det-button details">
          View details...
      </Link>
    </div>
  );
}
export default Advertisement;
