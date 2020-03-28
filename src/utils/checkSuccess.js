const checkSuccess = (status, setSuccess, numberSpan) => {
  if (status === 200) {
    let spanSuccess = document.getElementsByClassName('success-message')[numberSpan];
    spanSuccess.style.opacity = 1;
    setSuccess(true);
    setTimeout(() => {
      spanSuccess.style.opacity = 0;
    }, 3000);
  }
  return;
}

export default checkSuccess;