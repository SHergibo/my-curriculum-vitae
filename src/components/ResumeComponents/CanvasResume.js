import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function CanvasResume({ id, percent, skill }) {
  useEffect(() => {
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

    let canvas = document.getElementById(id);
    let percentage = percent;
    let radius;
    radius = canvas.width / 3;
    
    drawCanvas(percentage, radius, canvas);
  });
  
  return (
    <div className="canvas-container">
      <div className="canvas">
        <canvas id={id} width="135" height="135"></canvas>
        <span>{percent}%</span>
      </div>
      <p>{skill}</p>
    </div>
  );
}

CanvasResume.propTypes = {
  id: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  skill: PropTypes.string.isRequired,
}

export default CanvasResume;