import React from 'react';
import Nav from './Nav';
import PropTypes from 'prop-types';

function Navbar({ location, logout }) {

  let liList = [
    {name: "Accueil", to : "home", offset : 0, duration : 500},
    {name: "À propos", to : "about", offset : -80, duration : 1000},
    {name: "Résumé", to : "resume", offset : -80, duration : 1000},
    {name: "Contact", to : "contact", offset : -81, duration : 1000},
  ]

  let divMobile = <ul className="social-svg">
                    <li>
                      <a href="#home">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                          aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <path data-name="layer1"
                            fill="#000000" d="M1.15 21.7h13V61h-13zm46.55-1.3c-5.7 0-9.1 2.1-12.7 6.7v-5.4H22V61h13.1V39.7c0-4.5 2.3-8.9 7.5-8.9s8.3 4.4 8.3 8.8V61H64V38.7c0-15.5-10.5-18.3-16.3-18.3zM7.7 2.6C3.4 2.6 0 5.7 0 9.5s3.4 6.9 7.7 6.9 7.7-3.1 7.7-6.9S12 2.6 7.7 2.6z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#home">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                          aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <path data-name="layer2"
                            d="M32 0a32.021 32.021 0 0 0-10.1 62.4c1.6.3 2.2-.7 2.2-1.5v-6c-8.9 1.9-10.8-3.8-10.8-3.8-1.5-3.7-3.6-4.7-3.6-4.7-2.9-2 .2-1.9.2-1.9 3.2.2 4.9 3.3 4.9 3.3 2.9 4.9 7.5 3.5 9.3 2.7a6.93 6.93 0 0 1 2-4.3c-7.1-.8-14.6-3.6-14.6-15.8a12.27 12.27 0 0 1 3.3-8.6 11.965 11.965 0 0 1 .3-8.5s2.7-.9 8.8 3.3a30.873 30.873 0 0 1 8-1.1 30.292 30.292 0 0 1 8 1.1c6.1-4.1 8.8-3.3 8.8-3.3a11.965 11.965 0 0 1 .3 8.5 12.1 12.1 0 0 1 3.3 8.6c0 12.3-7.5 15-14.6 15.8a7.746 7.746 0 0 1 2.2 5.9v8.8c0 .9.6 1.8 2.2 1.5A32.021 32.021 0 0 0 32 0z"
                            fill="#202020"></path>
                          <path data-name="layer1" d="M12.1 45.9c-.1.2-.3.2-.5.1s-.4-.3-.3-.5.3-.2.6-.1c.2.2.3.4.2.5zm1.3 1.5a.589.589 0 0 1-.8-.8.631.631 0 0 1 .7.1.494.494 0 0 1 .1.7zm1.3 1.8a.585.585 0 0 1-.7-.3.6.6 0 0 1 0-.8.585.585 0 0 1 .7.3c.2.3.2.7 0 .8zm1.7 1.8c-.2.2-.5.1-.8-.1-.3-.3-.4-.6-.2-.8a.619.619 0 0 1 .8.1.554.554 0 0 1 .2.8zm2.4 1c-.1.3-.4.4-.8.3s-.6-.4-.5-.7.4-.4.8-.3c.3.2.6.5.5.7zm2.6.2c0 .3-.3.5-.7.5s-.7-.2-.7-.5.3-.5.7-.5c.4.1.7.3.7.5zm2.4-.4q0 .45-.6.6a.691.691 0 0 1-.8-.3q0-.45.6-.6c.5-.1.8.1.8.3z"
                            fill="#202020"></path>
                        </svg>
                      </a>
                    </li>
                  </ul>;

  let divNonMobile = <ul className="social-svg">
                          <li>
                            <a href="https://www.linkedin.com/in/sachahergibo/">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                                aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <path data-name="layer1"
                                  fill="#000000" d="M1.15 21.7h13V61h-13zm46.55-1.3c-5.7 0-9.1 2.1-12.7 6.7v-5.4H22V61h13.1V39.7c0-4.5 2.3-8.9 7.5-8.9s8.3 4.4 8.3 8.8V61H64V38.7c0-15.5-10.5-18.3-16.3-18.3zM7.7 2.6C3.4 2.6 0 5.7 0 9.5s3.4 6.9 7.7 6.9 7.7-3.1 7.7-6.9S12 2.6 7.7 2.6z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="https://github.com/SHergibo">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                                aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <path data-name="layer2"
                                  d="M32 0a32.021 32.021 0 0 0-10.1 62.4c1.6.3 2.2-.7 2.2-1.5v-6c-8.9 1.9-10.8-3.8-10.8-3.8-1.5-3.7-3.6-4.7-3.6-4.7-2.9-2 .2-1.9.2-1.9 3.2.2 4.9 3.3 4.9 3.3 2.9 4.9 7.5 3.5 9.3 2.7a6.93 6.93 0 0 1 2-4.3c-7.1-.8-14.6-3.6-14.6-15.8a12.27 12.27 0 0 1 3.3-8.6 11.965 11.965 0 0 1 .3-8.5s2.7-.9 8.8 3.3a30.873 30.873 0 0 1 8-1.1 30.292 30.292 0 0 1 8 1.1c6.1-4.1 8.8-3.3 8.8-3.3a11.965 11.965 0 0 1 .3 8.5 12.1 12.1 0 0 1 3.3 8.6c0 12.3-7.5 15-14.6 15.8a7.746 7.746 0 0 1 2.2 5.9v8.8c0 .9.6 1.8 2.2 1.5A32.021 32.021 0 0 0 32 0z"
                                  fill="#202020"></path>
                                <path data-name="layer1" d="M12.1 45.9c-.1.2-.3.2-.5.1s-.4-.3-.3-.5.3-.2.6-.1c.2.2.3.4.2.5zm1.3 1.5a.589.589 0 0 1-.8-.8.631.631 0 0 1 .7.1.494.494 0 0 1 .1.7zm1.3 1.8a.585.585 0 0 1-.7-.3.6.6 0 0 1 0-.8.585.585 0 0 1 .7.3c.2.3.2.7 0 .8zm1.7 1.8c-.2.2-.5.1-.8-.1-.3-.3-.4-.6-.2-.8a.619.619 0 0 1 .8.1.554.554 0 0 1 .2.8zm2.4 1c-.1.3-.4.4-.8.3s-.6-.4-.5-.7.4-.4.8-.3c.3.2.6.5.5.7zm2.6.2c0 .3-.3.5-.7.5s-.7-.2-.7-.5.3-.5.7-.5c.4.1.7.3.7.5zm2.4-.4q0 .45-.6.6a.691.691 0 0 1-.8-.3q0-.45.6-.6c.5-.1.8.1.8.3z"
                                  fill="#202020"></path>
                              </svg>
                            </a>
                          </li>
                        </ul>;
  
  if(location === "/admin"){
    liList = [
      {name: "Accueil", to : "home", offset : 0, duration : 500},
      {name: "Infos générales", to : "infos", offset : -80, duration : 1000},
      {name: "Éduc/Éxpe", to : "educexpe", offset : -80, duration : 1000},
      {name: "Compétences", to : "skills", offset : -80, duration : 1000},
    ]
  
    divMobile = <ul>
                  <li className="logoutSvg">
                    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title"
                      aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path d="M34 22V6H2v52h32V42"
                        strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" stroke="#202020"
                        fill="none" data-name="layer2" strokeLinejoin="round"></path>
                        <path d="M14 32h47M48 43l13-11-13-11" strokeWidth="3" strokeMiterlimit="10"
                        strokeLinecap="round" stroke="#202020" fill="none" data-name="layer1"
                        strokeLinejoin="round"></path>
                    </svg>
                  </li>
                </ul>;
  
    divNonMobile = <ul>
                    <li className="logoutSvg" onClick={logout} title="Déconnexion">
                      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title"
                      aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path d="M34 22V6H2v52h32V42"
                        strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" stroke="#202020"
                        fill="none" data-name="layer2" strokeLinejoin="round"></path>
                        <path d="M14 32h47M48 43l13-11-13-11" strokeWidth="3" strokeMiterlimit="10"
                        strokeLinecap="round" stroke="#202020" fill="none" data-name="layer1"
                        strokeLinejoin="round"></path>
                      </svg>
                    </li>
                  </ul>;
  
  }
  
  return (
    <Nav li={liList} divMobile={divMobile} divNonMobile={divNonMobile} />
  );
}

Navbar.propTypes = {
  location: PropTypes.string,
  logout: PropTypes.func,
}

export default Navbar;