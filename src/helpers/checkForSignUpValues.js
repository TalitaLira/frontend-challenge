import store from '../store/index';


export const isInitialSignUpValuesFilledUp = () => {
  const state = store.getState();
  const { name, email, password } = state.signUpForm.value
  return name && email && password;
};

export const isMoreInfoFilledUp = () => {
  const state = store.getState();
  const { color, terms } = state.signUpForm.value
  return color && terms;
};

export const isFormSubmitted = () => {
  const state = store.getState();
  const { isFormSubmitted } = state.signUpForm.value
  return isFormSubmitted;
};