const checkSuccess = async (status, setTimeoutLoader, setLoader, setTimeoutSuccess, setSpanSuccess, setTimeoutError, setSpanError) => {
  if(status === 200){
    setTimeoutLoader.current = await setTimeout(() => {
      setLoader(false);
      setSpanSuccess(true);
    }, 2000);
    setTimeoutSuccess.current = await setTimeout(() => {
      setSpanSuccess(false);
    }, 4000);
  }else{
    setTimeoutLoader.current = await setTimeout(() => {
      setLoader(false);
      setSpanError(true);
    }, 2000);
    setTimeoutError.current = await setTimeout(() => {
      setSpanError(false);
    }, 6000);
  }
  return;
}

export default checkSuccess;