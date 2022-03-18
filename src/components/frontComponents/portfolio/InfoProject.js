import React, { useState } from "react";
import PropTypes from "prop-types";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import axios from "axios";
import TitleAction from "../../TitleAction";
import { displayModalNoValue } from "../../../utils/modalDisplay";
import ModalDisplay from "../../ModalDisplay";
import {
  Navigation,
  Pagination,
  Keyboard,
  Mousewheel,
  Controller,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

function InfoProject({
  value,
  setArrayProject,
  setDisplayProject,
  pageIndexState,
  windowWidth,
  switchProjectCarousel,
  indexProjectState,
  pageIndexCarousel,
  nextProjectState,
}) {
  const { pageIndex, setPageIndex } = pageIndexState;
  const { indexProject, setIndexProject } = indexProjectState;
  const { nextProject, setNextProject } = nextProjectState;
  const [displayForm, setDisplayForm] = useState(false);
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  let descriptionArray = value.description.split(/\n/gi);

  let displayDesc = descriptionArray.map((item, index) => {
    if (item.length > 0) {
      return <p key={`descProject-${index}`}>{item}</p>;
    } else {
      return null;
    }
  });

  let displayFrameWorkUsed = value.technoUsedFront.map((item, index) => {
    return <li key={`frameworkUsed-${index}`}>{item.label}</li>;
  });

  let displayTechnoUsedBack = value.technoUsedBack.map((item, index) => {
    return <li key={`technoUsedBack-${index}`}>{item.label}</li>;
  });

  const closeProjectInfo = async () => {
    setArrayProject((arrayProject) => {
      return arrayProject.filter((el) => el.pageIndex === pageIndexCarousel);
    });
    if (pageIndex === pageIndexCarousel) {
      const getListProjectEndPoint = `${apiDomain}/api/${apiVersion}/projects/pagination?page=${
        pageIndexCarousel - 1
      }`;
      await axios.get(getListProjectEndPoint).then((response) => {
        setArrayProject(response.data.arrayData);
      });
    } else {
      setPageIndex(pageIndexCarousel);
    }

    if (indexProject !== 0) setIndexProject(0);
    if (!nextProject) setNextProject(true);
    setDisplayProject(false);
  };

  const swiperModal = (
    <Swiper
      className={"swiper-modal"}
      modules={[Navigation, Pagination, Keyboard, Mousewheel, Controller]}
      spaceBetween={20}
      slidesPerView={1}
      loop={value.images.length > 1 ? true : false}
      navigation
      keyboard={{
        enabled: true,
      }}
      mousewheel={true}
      pagination={{ clickable: true }}
      onSwiper={setFirstSwiper}
      controller={{ control: secondSwiper }}
    >
      {value.images.map((item, index) => {
        return (
          <SwiperSlide key={item.id + index}>
            <img
              src={`${apiDomain}/api/${apiVersion}/projects/image/${item.fileName}`}
              alt={item.alt}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );

  return (
    <div className="project-container">
      {windowWidth < 1087 && (
        <div
          className={
            indexProject > 0
              ? "navigation-small-device-carousel"
              : "navigation-small-device-carousel navigation-small-device-carousel-first"
          }
        >
          {indexProject > 0 && (
            <button
              title="Projet précédant"
              onClick={() => {
                switchProjectCarousel(0);
              }}
            >
              <FontAwesomeIcon id="chevronL" icon="chevron-left" /> Projet
              précédant
            </button>
          )}
          {nextProject && (
            <button
              title="Projet suivant"
              onClick={() => {
                switchProjectCarousel(1);
              }}
            >
              Projet suivant{" "}
              <FontAwesomeIcon id="chevronR" icon="chevron-right" />
            </button>
          )}
        </div>
      )}

      <div className="info-project-container">
        <div className="img-project">
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Mousewheel, Controller]}
            spaceBetween={20}
            slidesPerView={1}
            loop={value.images.length > 1 ? true : false}
            navigation
            keyboard={{
              enabled: true,
            }}
            mousewheel={true}
            pagination={{ clickable: true }}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            onClick={() => {
              displayModalNoValue(setDisplayForm);
            }}
          >
            {value.images.map((item, index) => {
              return (
                <SwiperSlide key={item.id + index}>
                  <img
                    src={`${apiDomain}/api/${apiVersion}/projects/image/${item.fileName}`}
                    alt={item.alt}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <ModalDisplay
            displayFormState={{ displayForm, setDisplayForm }}
            div={swiperModal}
          />

          {value.urlWeb && (
            <span>
              <a
                href={value.urlWeb}
                target="_blank"
                rel="noreferrer"
                title="Lien vers le site web"
              >
                <FontAwesomeIcon icon="link" />
                Lien vers le site web
              </a>
            </span>
          )}
          <span>
            <a
              href={value.urlGithub}
              target="_blank"
              rel="noreferrer"
              title="Lien vers le projet GitHub"
            >
              <FontAwesomeIcon icon={["fab", "github"]} />
              Lien vers le projet GitHub
            </a>
          </span>
        </div>
        <div className="info-project">
          <TitleAction
            format="return"
            title={value.projectName}
            btnTitle="Retourner vers le portfolio"
            action={closeProjectInfo}
          />
          <div>{displayDesc}</div>
          {(value.technoUsedFront.length >= 1 ||
            value.technoUsedBack.length >= 1) && (
            <div className="techno-used">
              {value.technoUsedFront.length >= 1 && (
                <>
                  {value.technoUsedFront.length > 1 && (
                    <h4>Technologies Front-End utilisées :</h4>
                  )}
                  {value.technoUsedFront.length === 1 && (
                    <h4>Technologie Front-End utilisée :</h4>
                  )}
                  <ul>{displayFrameWorkUsed}</ul>
                </>
              )}
              {value.technoUsedBack.length >= 1 && (
                <>
                  {value.technoUsedBack.length > 1 && (
                    <h4>Technologies Back-End utilisées :</h4>
                  )}
                  {value.technoUsedBack.length === 1 && (
                    <h4>Technologie Back-End utilisée :</h4>
                  )}
                  <ul>{displayTechnoUsedBack}</ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

InfoProject.propTypes = {
  value: PropTypes.object.isRequired,
  setArrayProject: PropTypes.func.isRequired,
  setDisplayProject: PropTypes.func.isRequired,
  setPageIndex: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    setPageIndex: PropTypes.func.isRequired,
  }),
  windowWidth: PropTypes.number.isRequired,
  switchProjectCarousel: PropTypes.func.isRequired,
  indexProjectState: PropTypes.shape({
    indexProject: PropTypes.number.isRequired,
    setIndexProject: PropTypes.func.isRequired,
  }),
  pageIndexCarousel: PropTypes.number.isRequired,
  nextProjectState: PropTypes.shape({
    nextProject: PropTypes.bool.isRequired,
    setNextProject: PropTypes.func.isRequired,
  }),
};

export default InfoProject;
