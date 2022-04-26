const checkSuccess = async (
  setTimeoutLoader,
  setLoader,
  setTimeoutSuccess,
  setSpanSuccess
) => {
  setTimeoutLoader.current = await setTimeout(() => {
    setLoader(false);
    setSpanSuccess(true);
  }, 2000);
  setTimeoutSuccess.current = await setTimeout(() => {
    setSpanSuccess(false);
  }, 6000);
  return;
};

const checkErrors = async (
  setTimeoutLoader,
  setLoader,
  setTimeoutError,
  setSpanError
) => {
  setTimeoutLoader.current = await setTimeout(() => {
    setLoader(false);
    setSpanError(true);
  }, 2000);
  setTimeoutError.current = await setTimeout(() => {
    setSpanError(false);
  }, 6000);
  return;
};

export { checkSuccess, checkErrors };
