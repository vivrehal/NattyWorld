import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter, faFacebook, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const Footer = () => {
  return (
    <>
    <footer className=" bg-[#37373766] text-gray-300 pt-8 py-4 px-16 border-t-2 border-t-white rounded-3xl">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold">Company Name</h2>
          <p className="mt-2">A short description of the company.</p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
        <nav className="mt-6 lg:mt-0">
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div className="mt-8 lg:mt-12 border-t border-gray-800 pt-4 text-center">
        <p className="text-lg lg:text-xl font-semibold">"An inspiring quote here."</p>
        <p className="mt-2">Follow us on social media for more updates!</p>
        <p className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-linkedin"></i></a>
        </p>
        <p className="mt-4">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
