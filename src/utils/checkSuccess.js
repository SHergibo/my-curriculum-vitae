const checkSuccess = (status, success, setSuccess, numberSpan) => {
  if (status === 200) {
    let spanSuccess = document.getElementsByClassName('success-message')[numberSpan];
    spanSuccess.style.opacity = 1;
    setSuccess(true);
    setTimeout(() => {
      spanSuccess.style.opacity = 0;
    }, 3000);
    setTimeout(() => {
      setSuccess(false);
    }, 3500);
  }
  return success;
}

export default checkSuccess;