import React from "react";
import "./foot.css";
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from "react-icons/ai";

const Foot = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy;2024 Your E-learning Platform. All rights reserved.<br />
          Made By Subitha 💖
        </p>
        <div className="social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <AiFillFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <AiFillTwitterSquare />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
