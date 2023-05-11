import React from 'react';
import "./_footer.scss";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, ad phaedrum consetetur per. Sensibus adolescens disputando ei ius, usu cu erant paulo eligendi. Facete referrentur delicatissimi sit cu, vim cu dolor nemore alienum. Mei et odio eligendi. Cu blandit ponderum his.
              Id pri paulo exerci. Corpora apeirian et duo, ne recusabo mediocrem sed. Mucius omnium dolorum ut has. Has ad prima eloquentiam.  
              Vix dicit nullam ei, vel aliquid denique id.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><a href="">Food</a></li>
              <li><a href="">Home</a></li>
              <li><a href="">Car</a></li>
              <li><a href="">Cloths</a></li>
              <li><a href="">Technology</a></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="layouts/signup.html">Sign-Up</a></li>
              <li><a href="">About Us</a></li>
              <li><a href="">Contact Us</a></li>
              <li><a href="">Contribute</a></li>
              <li><a href="">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright 2023 All Rights Reserved by me!
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <a className="facebook" href="#">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a className="dribbble" href="#">
                  <i className="fa fa-dribbble"></i>
                </a>
              </li>
              <li>
                <a className="linkedin" href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;