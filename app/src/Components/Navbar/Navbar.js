import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  const navRef = useRef(null);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
  }

  return (
    <header id="navHeader">
      <h3>GIF-point-com</h3>

      <nav id="navBar" ref={navRef}>
        <Link to="/">Home</Link>
        <Link to="/generate">Generate a GIF</Link>
        <Link to="/collection">View collection</Link>
        <Link to="/about">About us</Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button id="navBurger" className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
