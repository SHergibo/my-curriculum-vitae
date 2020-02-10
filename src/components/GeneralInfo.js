import React, { useLayoutEffect, useState } from 'react';
import FormGeneralInfo from './FormGeneralInfo';
import PropTypes from 'prop-types';

function GeneralInfo({ data, onSubmitAdd, onSubmitEdit, success, showEditForm }) {
  const [generalInfo, setGeneralInfo] = useState();

  useLayoutEffect(() => {
    if(data){
      setGeneralInfo(data);
    }else{
      setGeneralInfo();
    }
  }, [data]);

  return (
    <div className="info-section">
      <div id="infos" className="wrapper">
        <div className="title-right">
          Infos générales
        </div>
        <div className="info-container">
          <div className="title-container title-container-info-gen">
            <h2>Infos générales</h2>
          </div>

          <div className="forms-block">
            {!generalInfo && (
              <FormGeneralInfo handleFunction={onSubmitAdd} formType="add" success={success} />
            )}

            {showEditForm && (
              <FormGeneralInfo handleFunction={onSubmitEdit} formType="edit" value={generalInfo} success={success} />     
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

GeneralInfo.propTypes = {
  data: PropTypes.object,
  onSubmitAdd: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  success: PropTypes.bool
}

export default GeneralInfo;