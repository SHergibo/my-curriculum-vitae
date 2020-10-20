const checkSuccess = (status, ref) => {
  if (status === 200) {
    let spanSuccess = ref.current;
    spanSuccess.style.opacity = 1;
    setTimeout(() => {
      spanSuccess.style.opacity = 0;
    }, 3000);
  }
  return;
}

export default checkSuccess;