const checkSuccess = (status, setSuccess, ref) => {
  if (status === 200) {
    let spanSuccess = ref.current;
    spanSuccess.style.opacity = 1;
    setSuccess(true);
    setTimeout(() => {
      spanSuccess.style.opacity = 0;
    }, 3000);
  }
  return;
}

export default checkSuccess;