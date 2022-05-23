import React, { useState, useEffect, useCallback, useRef } from "react";
import InfoProject from "./InfoProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import axios from "axios";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

function Portfolio({ isLoaded }) {
  const [value, setValue] = useState({});
  const [displayProject, setDisplayProject] = useState(false);
  const [arrayProject, setArrayProject] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageIndexCarousel, setPageIndexCarousel] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [paginationInput, setPaginationInput] = useState(null);
  const [indexProject, setIndexProject] = useState(0);
  const [nextProject, setNextProject] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const nodeRef = useRef(null);
  const pageSize = 6;

  useEffect(() => {
    if (pageIndex) {
      setPaginationInput(pageIndex);
    }
  }, [pageIndex]);

  const responsiveWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", responsiveWidth);
    return () => {
      window.removeEventListener("resize", responsiveWidth);
    };
  }, [responsiveWidth]);

  const getData = useCallback(async () => {
    const getListProjectEndPoint = `${apiDomain}/api/${apiVersion}/projects/pagination?page=${
      pageIndex - 1
    }`;
    await axios.get(getListProjectEndPoint).then((response) => {
      setArrayProject(response.data.arrayData);
      setPageCount(Math.ceil(response.data.totalData / pageSize));
    });
  }, [pageIndex]);

  useEffect(() => {
    if (isLoaded) {
      getData();
    }
  }, [isLoaded, getData]);

  const displayProjectInfo = async (item, setDisplayProject, setValue) => {
    setDisplayProject(true);
    setValue(item);
    let findIndexProject = arrayProject.findIndex((el) => el._id === item._id);
    setIndexProject(findIndexProject);
    if (pageIndex > 1 && (findIndexProject === 0 || findIndexProject === 1)) {
      const getListProjectEndPoint = `${apiDomain}/api/${apiVersion}/projects/pagination?page=${
        pageIndex - 2
      }`;
      await axios.get(getListProjectEndPoint).then((response) => {
        setArrayProject((arrayProject) => [
          ...response.data.arrayData,
          ...arrayProject,
        ]);
        setIndexProject(pageSize + findIndexProject);
      });
    }
    if (
      (findIndexProject === pageSize - 2 ||
        findIndexProject === pageSize - 1) &&
      pageIndex < pageCount
    ) {
      const getListProjectEndPoint = `${apiDomain}/api/${apiVersion}/projects/pagination?page=${pageIndex}`;
      await axios.get(getListProjectEndPoint).then((response) => {
        setArrayProject((arrayProject) => [
          ...arrayProject,
          ...response.data.arrayData,
        ]);
      });
    }
    arrayProject[findIndexProject + 1]
      ? setNextProject(true)
      : setNextProject(false);
  };

  const switchProjectCarousel = async (increment) => {
    if (increment === 1) {
      setValue(arrayProject[indexProject + 1]);
      setIndexProject((indexProject) => indexProject + 1);
      if (pageIndexCarousel + 1 <= pageCount) {
        let realPageIndexCarousel = pageIndexCarousel;
        if ((indexProject + 1) % pageSize === 0) {
          setPageIndexCarousel((pageIndexCarousel) => pageIndexCarousel + 1);
          realPageIndexCarousel = pageIndexCarousel + 1;
        }
        if (
          !arrayProject[indexProject + 3] &&
          realPageIndexCarousel < pageCount
        ) {
          const getListProjectEndPoint = `${apiDomain}/api/${apiVersion}/projects/pagination?page=${pageIndexCarousel}`;
          await axios.get(getListProjectEndPoint).then((response) => {
            setArrayProject((arrayProject) => [
              ...arrayProject,
              ...response.data.arrayData,
            ]);
          });
        }
      } else {
        arrayProject[indexProject + 2]
          ? setNextProject(true)
          : setNextProject(false);
      }
    } else {
      setValue(arrayProject[indexProject - 1]);
      setNextProject(true);
      setIndexProject((indexProject) => indexProject - 1);
      let realPageIndexCarousel = pageIndexCarousel;
      if ((indexProject - 1) % 6 === pageSize - 1) {
        setPageIndexCarousel((pageIndexCarousel) => pageIndexCarousel - 1);
        realPageIndexCarousel = pageIndexCarousel - 1;
      }
      if (realPageIndexCarousel > 1) {
        if (!arrayProject[indexProject - 3]) {
          const getListProjectEndPoint = `${apiDomain}/api/${apiVersion}/projects/pagination?page=${
            pageIndexCarousel - 2
          }`;
          await axios.get(getListProjectEndPoint).then((response) => {
            setArrayProject((arrayProject) => [
              ...response.data.arrayData,
              ...arrayProject,
            ]);
            setIndexProject(pageSize + (indexProject - 1));
          });
        }
      }
    }
  };

  const gotoPage = (page) => {
    setPageIndex(page);
    setPageIndexCarousel(page);
  };

  const previousPage = () => {
    if (pageIndex > 1) {
      setPageIndex((currPageIndex) => currPageIndex - 1);
      setPageIndexCarousel((currPageIndex) => currPageIndex - 1);
    }
  };

  const nextPage = async () => {
    if (pageIndex < pageCount) {
      setPageIndex((currPageIndex) => parseInt(currPageIndex) + 1);
      setPageIndexCarousel((currPageIndex) => parseInt(currPageIndex) + 1);
    }
  };

  const inputPagination = (e) => {
    if (e.target.value > pageCount) {
      setPageIndex(pageCount);
      setPageIndexCarousel(pageCount);
      setPaginationInput(pageCount);
    } else if (e.target.value < 0 || e.target.value === "") {
      setPaginationInput(null);
    } else if (e.target.value === "0") {
      setPaginationInput(1);
      setPageIndex(1);
      setPageIndexCarousel(1);
    } else {
      setPaginationInput(e.target.value);
      setPageIndex(e.target.value);
      setPageIndexCarousel(e.target.value);
    }
  };

  return (
    <>
      {!displayProject && (
        <div className="portfolio-container">
          <div id="portfolio" className="wrapper portfolio">
            <div className="title-right">Portfolio</div>
            <div className="projects">
              <div className="projects-portfolio">
                {arrayProject.map((item) => {
                  return (
                    <div className="project-card" key={item._id}>
                      <img
                        src={`${apiDomain}/api/${apiVersion}/projects/image/${item.images[0].fileName}`}
                        alt={item.images[0].alt}
                      />
                      <div className="project-card-name">
                        {item.projectName}
                      </div>
                      <div className="project-card-more">
                        <div>
                          <button
                            title="Voir le informations du projet"
                            tabIndex={0}
                            onClick={() =>
                              displayProjectInfo(
                                item,
                                setDisplayProject,
                                setValue
                              )
                            }
                            onKeyPress={() =>
                              displayProjectInfo(
                                item,
                                setDisplayProject,
                                setValue
                              )
                            }
                          >
                            <FontAwesomeIcon icon="plus" />
                          </button>
                          <span>
                            {item.url && (
                              <a
                                tabIndex={0}
                                target="_blank"
                                rel="noreferrer"
                                title="Voir le site web du projet"
                                href={item.url}
                              >
                                <FontAwesomeIcon icon="link" />
                              </a>
                            )}
                            {!item.url && (
                              <a
                                tabIndex={0}
                                target="_blank"
                                rel="noreferrer"
                                title="Voir le projet sur GitHub"
                                href={item.urlGithub}
                              >
                                <FontAwesomeIcon icon={["fab", "github"]} />
                              </a>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {pageCount >= 1 && (
                <div className="pagination">
                  <div className="action-pagination">
                    <button
                      onClick={() => gotoPage(1)}
                      aria-label="Aller au début"
                    >
                      <FontAwesomeIcon icon="angle-double-left" />
                    </button>
                    <button
                      onClick={() => previousPage()}
                      aria-label="Précédent"
                    >
                      <FontAwesomeIcon icon="angle-left" />
                    </button>
                    <span>
                      Page
                      <label>
                        <input
                          type="number"
                          value={paginationInput || ""}
                          min={1}
                          max={pageCount}
                          onChange={(e) => {
                            inputPagination(e);
                          }}
                        />
                      </label>
                      sur {pageCount}
                    </span>
                    <button onClick={() => nextPage()} aria-label="Suivant">
                      <FontAwesomeIcon icon="angle-right" />
                    </button>
                    <button
                      onClick={() => gotoPage(pageCount)}
                      aria-label="Aller à la fin"
                    >
                      <FontAwesomeIcon icon="angle-double-right" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {displayProject && (
        <div className="project-section">
          <div id="portfolio" className="wrapper-project project">
            {windowWidth >= 1087 && (
              <div className="project-carousel-full-screen">
                {indexProject > 0 && (
                  <button
                    className="carousel-before"
                    title="Projet précédant"
                    onClick={() => {
                      switchProjectCarousel(0);
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-left" />
                  </button>
                )}
              </div>
            )}

            <div className="portfolio-info-container">
              <div className="title-right">Projet - {value.projectName}</div>
              <SwitchTransition mode={"out-in"}>
                <CSSTransition
                  key={value._id}
                  nodeRef={nodeRef}
                  addEndListener={(done) => {
                    nodeRef.current.addEventListener(
                      "transitionend",
                      done,
                      false
                    );
                  }}
                  classNames="fade"
                >
                  <div ref={nodeRef}>
                    <InfoProject
                      value={value}
                      setArrayProject={setArrayProject}
                      setDisplayProject={setDisplayProject}
                      pageIndexState={{ pageIndex, setPageIndex }}
                      windowWidth={windowWidth}
                      switchProjectCarousel={switchProjectCarousel}
                      indexProjectState={{ indexProject, setIndexProject }}
                      pageIndexCarousel={pageIndexCarousel}
                      nextProjectState={{ nextProject, setNextProject }}
                    />
                  </div>
                </CSSTransition>
              </SwitchTransition>
            </div>

            {windowWidth >= 1087 && (
              <div className="project-carousel-full-screen">
                {nextProject && (
                  <button
                    className="carousel-after"
                    title="Projet suivant"
                    onClick={() => {
                      switchProjectCarousel(1);
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-right" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

Portfolio.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default Portfolio;
