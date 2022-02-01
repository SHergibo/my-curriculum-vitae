import React, { useState, useEffect, useCallback } from "react";
import InfoProject from "./InfoProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiDomain, apiVersion } from "./../apiConfig/ApiConfig";
import axios from "axios";
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
                        src={`${apiDomain}/api/${apiVersion}/projects/image/${item.img.filename}`}
                        alt={item.altImg}
                      />
                      <div className="project-card-name">
                        {item.projectName}
                      </div>
                      <div className="project-card-more">
                        <div>
                          <span
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
                          </span>
                          <span>
                            <a tabIndex={0} href={item.url}>
                              <FontAwesomeIcon icon="link" />
                            </a>
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
                    <button onClick={() => gotoPage(1)}>
                      <FontAwesomeIcon icon="angle-double-left" />
                    </button>
                    <button onClick={() => previousPage()}>
                      <FontAwesomeIcon icon="angle-left" />
                    </button>
                    <span>
                      Page
                      <input
                        type="number"
                        value={paginationInput || ""}
                        min={1}
                        max={pageCount}
                        onChange={(e) => {
                          inputPagination(e);
                        }}
                      />
                      sur {pageCount}
                    </span>
                    <button onClick={() => nextPage()}>
                      <FontAwesomeIcon icon="angle-right" />
                    </button>
                    <button onClick={() => gotoPage(pageCount)}>
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

            <div>
              <div className="title-right">Projet - {value.projectName}</div>
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
