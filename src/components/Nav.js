import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from "react-scroll";
import Logo from './Logo';
import PropTypes from 'prop-types';

function Nav({ headerRef, li, divMobile, divNonMobile }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mainMenu = useRef(null);
  const menu = useRef(null);
  const burgerSvg = useRef(null);
  const deleteSvg = useRef(null);

  const handleMenuScroll = useCallback(() => {
    let windowHeight;
    if (menu.current.classList[1] === "display-block" && mainMenu.current.classList[1] === undefined) {
      windowHeight = (headerRef.current.scrollHeight - menu.current.scrollHeight) - ((mainMenu.current.scrollHeight + 1) - menu.current.scrollHeight);
    } else if (mainMenu.current.classList[1] === "menu-fixed" && menu.current.classList[1] === "display-block") {
      windowHeight = headerRef.current.scrollHeight - ((mainMenu.current.scrollHeight + 1) - menu.current.scrollHeight);
    } else {
      windowHeight = headerRef.current.scrollHeight - (mainMenu.current.scrollHeight + 1);
    }
    let scroll = Math.round(window.scrollY);

    if (scroll >= windowHeight) {
      mainMenu.current.classList.add("menu-fixed");
    } else {
      mainMenu.current.classList.remove("menu-fixed");
    }
  },[headerRef]);

  useEffect(() => {
    window.addEventListener('scroll', handleMenuScroll);
    return () => {
      window.removeEventListener('scroll', handleMenuScroll);
    }
  }, [handleMenuScroll]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const burgerMenu = () => {
    menu.current.classList.toggle('display-block');

    if (burgerSvg.current.classList.contains('display-svg-menu')) {
      burgerSvg.current.classList.remove('display-svg-menu');
      deleteSvg.current.classList.add('display-svg-menu');
    } else {
      burgerSvg.current.classList.add('display-svg-menu');
      deleteSvg.current.classList.remove('display-svg-menu');
    }
  };

  const focusOnKeypress = (elem) => {
    document.getElementById(elem).scrollIntoView();
  }

  let liList = li.map((item, index) => {
    return <li tabIndex={0} onKeyPress={() => { focusOnKeypress(item.to) }} key={"nav" + index}>
      {windowWidth >= 960 &&
        <Link activeClass="active" to={item.to} spy={true} smooth={true} offset={item.offset} duration={item.duration}>
          {item.name}
        </Link>
      }
      {windowWidth < 960 &&
        <Link activeClass="active" to={item.to} spy={true} smooth={true} offset={item.offset} duration={item.duration} onClick={burgerMenu}>
          {item.name}
        </Link>
      }
    </li>;
  });

  return (
    <div ref={mainMenu} className="main-menu">
      <div className="wrapper container-nav">
        <Logo />
        <nav ref={menu} className="menu">
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
        {windowWidth < 960 &&
          <>
            <div ref={burgerSvg} id="burger-svg" className="burger-menu-svg" onClick={burgerMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path data-name="layer2"
                  fill="#202020" d="M2 8h60v8H2zm0 20h60v8H2z"></path>
                <path data-name="layer1" fill="#202020" d="M2 48h60v8H2z"></path>
              </svg>
            </div>
            <div ref={deleteSvg} id="delete-svg" className="burger-menu-svg display-svg-menu" onClick={burgerMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path data-name="layer1"
                  fill="#202020" d="M51 17.25L46.75 13 32 27.75 17.25 13 13 17.25 27.75 32 13 46.75 17.25 51 32 36.25 46.75 51 51 46.75 36.25 32 51 17.25z"></path>
              </svg>
            </div>
          </>
        }

      </div>
    </div>
  );
}

Nav.propTypes = {
  headerRef: PropTypes.object.isRequired,
  li: PropTypes.array.isRequired,
  divMobile: PropTypes.object.isRequired,
  divNonMobile: PropTypes.object.isRequired,
}

export default Nav;