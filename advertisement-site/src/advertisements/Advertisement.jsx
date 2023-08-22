import React from "react";

import { Link } from 'react-router-dom';



function Advertisement({ ad }) {
  const locationPin  = "https://advertisement-website.s3.eu-west-3.amazonaws.com/static+icons+public/pin.png";
  const adPicture = "https://advertisement-website.s3.eu-west-3.amazonaws.com/static+icons+public/loading.jpg";

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