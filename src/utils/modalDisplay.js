const displayModal = (value, setDisplayForm, setValue) => {
  document.body.setAttribute('style', 'overflow : hidden;');
  setDisplayForm(true);
  setValue(value);
}

const closeModal = (setDisplayForm) => {
  document.body.removeAttribute('style');
  setDisplayForm(false);
}  

export { displayModal, closeModal };