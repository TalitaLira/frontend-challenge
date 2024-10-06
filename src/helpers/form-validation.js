
export const SIGN_UP_INITIAL_VALUES = {
  firstName: '',
  email: '',
  password: '',
};

export const ADDITIONAL_INFO_INITIAL_VALUES = {
  selectColor: '',
  terms: [],
}

export const validateSignUpForm = (values) => {
  const errors = {};

  if(!values.firstName){
    errors.firstName = 'First name is required';
  }
  if (!values.email) {
    errors.email = 'E-mail is required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid e-mail address';
  }
  if(!values.password){
    errors.password = 'A password is required';
  }
  return errors;
      
}

export const validateAdditionalInfoForm = (values) => {
  const errors = {};

  if (!values.selectColor) {
    errors.selectColor = 'Please select a color';
  }
  return errors;
}
