import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

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
        <a href="/#">Home</a>
        <a href="/#">Generate a GIF</a>
        <a href="/#">View collection</a>
        <a href="/#">About us</a>
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
