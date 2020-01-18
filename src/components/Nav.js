import React, { useEffect } from 'react';
import { Link } from "react-scroll";
import Logo from './Logo';
import PropTypes from 'prop-types';

function Nav({ li, divMobile, divNonMobile }) {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let header = document.getElementById('header');
      let mainMenu = document.getElementsByClassName('main-menu')[0];
      let menu = document.getElementsByClassName('menu')[0];
      let menuOpen = document.getElementsByClassName('display-block')[0];
      let menuFixed = document.getElementsByClassName('menu-fixed')[0];
      let windowHeight;
      if (menuOpen && !menuFixed) {
        windowHeight = (header.scrollHeight - menu.scrollHeight) - ((mainMenu.scrollHeight + 1) - menu.scrollHeight);
      } else if (menuFixed && menuOpen) {
        windowHeight = header.scrollHeight - ((mainMenu.scrollHeight + 1) - menu.scrollHeight);
      } else {
        windowHeight = header.scrollHeight - (mainMenu.scrollHeight + 1);
      }
      let scroll = Math.round(window.scrollY);
      if (scroll >= windowHeight) {
        mainMenu.classList.add("menu-fixed");
      } else {
        mainMenu.classList.remove("menu-fixed");
      }
    });
  }, []);

  const burgerMenu = () => {
    let menuResp = document.getElementsByClassName('menu')[0];
    let burgerSvg = document.getElementById('burger-svg');
    let deleteSvg = document.getElementById('delete-svg');
    menuResp.classList.toggle('display-block');

    if (burgerSvg.classList.contains('display-svg-menu')) {
      burgerSvg.classList.remove('display-svg-menu');
      deleteSvg.classList.add('display-svg-menu');
    } else {
      burgerSvg.classList.add('display-svg-menu');
      deleteSvg.classList.remove('display-svg-menu');
    }
  };

  let liList = li.map((item, index) => {
    return <li key={"nav"+index}>
            <Link activeClass="active" to={item.to} spy={true} smooth={true} offset={item.offset} duration={item.duration}>
              {item.name}
            </Link>
          </li>;
  });

  return (
    <div className="main-menu">
      <div className="wrapper container-nav">
        <Logo />
        <nav className="menu" onClick={burgerMenu}>
          <ul className="list-menu">
            {liList}
          </ul>
          <div className="social-mobile">
            {divMobile}
          </div>
        </nav>
        <div className="social">
          {divNonMobile}
        </div>
        <div id="burger-svg" className="burger-menu-svg" onClick={burgerMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
            aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path data-name="layer2"
              fill="#202020" d="M2 8h60v8H2zm0 20h60v8H2z"></path>
            <path data-name="layer1" fill="#202020" d="M2 48h60v8H2z"></path>
          </svg>
        </div>
        <div id="delete-svg" className="burger-menu-svg display-svg-menu" onClick={burgerMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
            aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path data-name="layer1"
              fill="#202020" d="M51 17.25L46.75 13 32 27.75 17.25 13 13 17.25 27.75 32 13 46.75 17.25 51 32 36.25 46.75 51 51 46.75 36.25 32 51 17.25z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

Nav.propTypes = {
  li: PropTypes.array.isRequired,
  divMobile: PropTypes.object.isRequired,
  divNonMobile: PropTypes.object.isRequired,
}

export default Nav;