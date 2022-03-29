import React, { useState, useEffect, createRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormProfessionTitle from "../adminForms/FormProfessionTitle";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

function DisplayListProfessionTitle({ generalInfoState }) {
  const { generalInfo, setGeneralInfo } = generalInfoState;
  const [arrayProfessionTitle, setArrayProfessionTitle] = useState([]);
  const [formListState, setFormListState] = useState({});
  const [lastFormListOpen, setLastFormListOpen] = useState();

  useEffect(() => {
    setArrayProfessionTitle(generalInfo.professionTitles);
    generalInfo.professionTitles.forEach((professionTitle) => {
      setFormListState((prevObject) => ({
        ...prevObject,
        [professionTitle._id]: false,
      }));
    });
  }, [generalInfo]);

  const onClickDelete = async (data) => {
    const deleteProjectEndPoint = `${apiDomain}/api/${apiVersion}/infos/prof-title-delete/${generalInfo._id}/${data._id}`;
    await axiosInstance.delete(deleteProjectEndPoint, data).then((response) => {
      setGeneralInfo({
        ...generalInfo,
        professionTitles: response.data,
      });
      setArrayProfessionTitle(response.data);
    });
  };

  const displayForm = (id) => {
    if (lastFormListOpen && lastFormListOpen !== id) {
      setFormListState((prevObject) => ({
        ...prevObject,
        [lastFormListOpen]: false,
      }));
    }
    setFormListState((prevObject) => ({
      ...prevObject,
      [id]: !formListState[id],
    }));
    if (lastFormListOpen === id) setLastFormListOpen();
    if (lastFormListOpen !== id) setLastFormListOpen(id);
  };

  let liListProfessionTitle = arrayProfessionTitle.map((item) => {
    const itemRef = createRef(null);
    return (
      <li key={item._id}>
        <div className="div-list-container">
          <div className="div-list-info-container">
            <div className="title-list">{item.nameProfessionTitle}</div>
          </div>
          <div className="div-list-btn-container">
            <button
              className="btn-list-edit"
              title="Éditer"
              onClick={() => displayForm(item._id)}
            >
              {lastFormListOpen === item._id ? (
                <FontAwesomeIcon icon="times" />
              ) : (
                <FontAwesomeIcon icon="edit" />
              )}
            </button>
            <button
              className="btn-list-delete"
              title="Supprimer"
              onClick={() => onClickDelete(item)}
            >
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          </div>
        </div>
        <CSSTransition
          nodeRef={itemRef}
          in={formListState[item._id]}
          classNames="form-list"
          unmountOnExit
          timeout={500}
        >
          <div ref={itemRef} className="form-in-list">
            <FormProfessionTitle
              value={item}
              projectState={{ arrayProfessionTitle, setArrayProfessionTitle }}
              generalInfoState={generalInfoState}
            />
          </div>
        </CSSTransition>
      </li>
    );
  });

  return (
    <>
      <div>
        <h4>Titres de profession</h4>
        {arrayProfessionTitle.length >= 1 ? (
          <ul>{liListProfessionTitle}</ul>
        ) : (
          <p>Pas de données à afficher !</p>
        )}
      </div>
    </>
  );
}

DisplayListProfessionTitle.propTypes = {
  generalInfoState: PropTypes.shape({
    generalInfo: PropTypes.object.isRequired,
    setGeneralInfo: PropTypes.func.isRequired,
  }),
};

export default DisplayListProfessionTitle;
