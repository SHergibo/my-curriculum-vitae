import React, { useState, useCallback, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import workingData from "../../../utils/workingData";
import Modal from "../../Modal";
import { displayModal } from "../../../utils/modalDisplay";
import FormEducExpe from "../adminForms/FormEducExpe";

function DisplayListEducExpe() {
  const [value, setValue] = useState({});
  const [arrayEduc, setArrayEduc] = useState([]);
  const [arrayExpe, setArrayExpe] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  const getData = useCallback(async () => {
    const getListEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educs-exps/educs-exps-list`;
    await axiosInstance.get(getListEducExpeEndPoint).then((response) => {
      const workingDatas = workingData(response.data, "educExpe");
      setArrayEduc(workingDatas[0]);
      setArrayExpe(workingDatas[1]);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  let liListEduc;
  let liListExpe;

  const formatDate = (date) => {
    let year = date.split("-")[0];
    return year;
  };

  const onClickDelete = async (data) => {
    const deleteEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educs-exps/${data._id}`;
    await axiosInstance.delete(deleteEducExpeEndPoint, data).then(() => {
      if (data.educExpe === "experience") {
        setArrayExpe([...arrayExpe].filter((item) => item._id !== data._id));
      } else if (data.educExpe === "education") {
        setArrayEduc([...arrayEduc].filter((item) => item._id !== data._id));
      }
    });
  };

  const liListRender = (item) => {
    let formatDateStart = formatDate(item.dateStart);
    let formatDateEnd = formatDate(item.dateEnd);
    return (
      <li key={item._id}>
        <div className="div-list-container">
          <div className="date-list">
            {formatDateStart} - {formatDateEnd}
          </div>
          <div className="title-list">{item.titleEducExpe}</div>
        </div>
        <div className="div-list-btn-container">
          <button
            className="btn-list-edit"
            title="Éditer"
            onClick={() => displayModal(item, setDisplayForm, setValue)}
          >
            <FontAwesomeIcon icon="edit" />
          </button>
          <button
            className="btn-list-delete"
            title="Supprimer"
            onClick={() => onClickDelete(item)}
          >
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
      </li>
    );
  };

  if (arrayEduc) {
    liListEduc = arrayEduc.map((item) => {
      return liListRender(item);
    });
  }

  if (arrayExpe) {
    liListExpe = arrayExpe.map((item) => {
      return liListRender(item);
    });
  }

  return (
    <>
      <div>
        <h4>Éducation</h4>
        <ul>{liListEduc}</ul>
      </div>
      <div>
        <h4>Expérience</h4>
        <ul>{liListExpe}</ul>
      </div>
      {displayForm && (
        <Modal
          div={
            <FormEducExpe
              value={value}
              setDisplayForm={setDisplayForm}
              educState={{ arrayEduc, setArrayEduc }}
              expeState={{ arrayExpe, setArrayExpe }}
            />
          }
          setDisplayForm={setDisplayForm}
        />
      )}
    </>
  );
}

export default DisplayListEducExpe;
