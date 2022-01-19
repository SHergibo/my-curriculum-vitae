import React, { useRef } from 'react';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function CanvasResume({ data }) {
  let canvasRef = useRef([]);

  const percentToRadians = (percentage) => {
    let degrees = percentage * 360 / 100;
    return ((degrees + 180) / 180) * Math.PI;
  }

  const drawCanvas = (percentage, radius, canvas) => {
    let ctx = canvas.getContext('2d');
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let start = percentToRadians(0);
    let end = percentToRadians(percentage);
    let counterClockwise = true;
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end, counterClockwise);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#041527';
    ctx.stroke();
    counterClockwise = false;
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end, counterClockwise);
    ctx.lineWidth = 8;
    let gradient = ctx.createLinearGradient(0,0,255,0);
    
    gradient.addColorStop(0.000, 'rgb(65, 233, 183)');
    gradient.addColorStop(0.5000, 'rgb(246, 211, 84)');
    ctx.strokeStyle = gradient;
    ctx.stroke();

  }

  const displayCodingSkill = data.map((item) => {
    if(item._id !== ""){
      return <div className="canvas-container" key={"canvas" + item._id}>
              <div className="canvas">
                <canvas ref={(el) => (canvasRef.current[item._id] = el)} id={item._id} width="135" height="135"></canvas>
                {item.fontAwesomeIcon &&
                  <span><FontAwesomeIcon icon={['fab', item.fontAwesomeIcon]} /></span>
                }
                {item.svgIcon &&                
                  <span>{parse(item.svgIcon)}</span>
                }
              </div>
              <p>{item.nameSkill}</p>
            </div>
    }
    return <div key={"canvas" + item._id}></div>;
  });


  Promise.all(displayCodingSkill).then( res => {
    data.map((item) => {
      if(item._id !== ""){
        let canvas = canvasRef.current[item._id];

        let percentage = item.percentage;
        let radius;
        radius = canvas.width / 3;
        
        drawCanvas(percentage, radius, canvas);
      }
      return item;
    });
  });
  
  return (
    <div className="skill-canvas">
      {displayCodingSkill}
    </div>
  );
}

CanvasResume.propTypes = {
  data: PropTypes.array.isRequired,
}

export default CanvasResume;