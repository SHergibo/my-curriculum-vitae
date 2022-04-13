import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-scroll";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Nav({ headerRef, li, divMobile, divNonMobile }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [burgerMenuSwitch, setBurgerMenuSwitch] = useState(false);
  const mainMenu = useRef(null);
  const menu = useRef(null);

  const handleMenuScroll = useCallback(() => {
    let windowHeight;
    if (
      menu.current.classList[1] === "display-block" &&
      mainMenu.current.classList[1] === undefined
    ) {
      windowHeight =
        headerRef.current.scrollHeight -
        menu.current.scrollHeight -
        (mainMenu.current.scrollHeight + 1 - menu.current.scrollHeight);
    } else if (
      mainMenu.current.classList[1] === "menu-fixed" &&
      menu.current.classList[1] === "display-block"
    ) {
      windowHeight =
        headerRef.current.scrollHeight -
        (mainMenu.current.scrollHeight + 1 - menu.current.scrollHeight);
    } else {
      windowHeight =
        headerRef.current.scrollHeight - (mainMenu.current.scrollHeight + 1);
    }
    let scroll = Math.round(window.scrollY);

    if (scroll >= windowHeight) {
      mainMenu.current.classList.add("menu-fixed");
    } else {
      mainMenu.current.classList.remove("menu-fixed");
    }
  }, [headerRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleMenuScroll);
    return () => {
      window.removeEventListener("scroll", handleMenuScroll);
    };
  }, [handleMenuScroll]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const burgerMenu = () => {
    menu.current.classList.toggle("display-block");
    setBurgerMenuSwitch(!burgerMenuSwitch);
  };

  const focusOnKeypress = (elem) => {
    document.getElementById(elem).scrollIntoView();
  };

  let liList = li.map((item, index) => {
    return (
      <li
        tabIndex={0}
        onKeyPress={() => {
          focusOnKeypress(item.to);
        }}
        key={"nav" + index}
      >
        {windowWidth >= 960 && (
          <Link
            activeClass="active"
            to={item.to}
            spy={true}
            smooth={true}
            offset={item.offset}
            duration={item.duration}
          >
            {item.name}
          </Link>
        )}
        {windowWidth < 960 && (
          <Link
            activeClass="active"
            to={item.to}
            spy={true}
            smooth={true}
            offset={item.offset}
            duration={item.duration}
            onClick={burgerMenu}
          >
            {item.name}
          </Link>
        )}
      </li>
    );
  });

  return (
    <div ref={mainMenu} className="main-menu">
      <div className="wrapper container-nav">
        <Logo />
        <nav ref={menu} className="menu">
          <ul className="list-menu">{liList}</ul>
          <div className="social-mobile">{divMobile}</div>
        </nav>
        <div className="social">{divNonMobile}</div>
        {windowWidth < 960 && (
          <>
            {!burgerMenuSwitch && (
              <div
                id="burger-svg"
                className="burger-menu-svg"
                onClick={burgerMenu}
              >
                <FontAwesomeIcon icon="bars" />
              </div>
            )}
            {burgerMenuSwitch && (
              <div
                id="delete-svg"
                className="burger-menu-svg"
                onClick={burgerMenu}
              >
                <FontAwesomeIcon icon="times" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

Nav.propTypes = {
  headerRef: PropTypes.object.isRequired,
  li: PropTypes.array.isRequired,
  divMobile: PropTypes.object.isRequired,
  divNonMobile: PropTypes.object.isRequired,
};

export default Nav;
