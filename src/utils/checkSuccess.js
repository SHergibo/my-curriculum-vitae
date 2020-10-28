const sleep = m => new Promise(r => setTimeout(r, m))

const checkSuccess = async (status, loadingRef, setLoader, successSpan, setSpanSuccess, errorSpanRef, errorMessageRef, setSpanError) => {
  let loading = loadingRef.current;
  await sleep(3000);
  loading.style.opacity = 0;
  await sleep(500);
  setLoader(false);
  loading.removeAttribute('style');
  if (status === 200) {
    let spanSuccess = successSpan.current;
    spanSuccess.style.opacity = 1;
    setSpanSuccess(true);
    await sleep(3000);
    spanSuccess.style.opacity = 0;
    await sleep(500);
    setSpanSuccess(false);
    spanSuccess.removeAttribute('style');
  }else if (status !== 200){
    setSpanError(true);
    errorSpanRef.current.style.opacity = 1;
    errorMessageRef.current.style.opacity = 1;
  }
  return;
}

export default checkSuccess;