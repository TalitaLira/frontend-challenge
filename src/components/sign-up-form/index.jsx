import React from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import { SIGN_UP_INITIAL_VALUES, validateSignUpForm } from "../../helpers/form-validation";
import { ButtonWrapper, Button, FormValidationMessage } from "../../common/styles";
import { FormField } from "./styles.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addSignUpInitialInfo } from "../../store/slices/signUpSlice.js";
import { useSelector } from "react-redux";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.signUpForm);
  const { name: storedName, email: storedEmail} = value;
  const SIGN_UP_STORED_VALUES = {
    firstName: storedName,
    email: storedEmail,
    password: ''
  };

  const isThereValuesStored = SIGN_UP_STORED_VALUES.firstName && SIGN_UP_STORED_VALUES.email;

  const handleClickNext = (values, setSubmitting) => {
    const { firstName: name, email, password } = values;
    dispatch(addSignUpInitialInfo({ name, email, password }))
    setSubmitting(false);
    navigate('/more-info');
  }

  return (
    <Formik
      initialValues={isThereValuesStored ? SIGN_UP_STORED_VALUES : SIGN_UP_INITIAL_VALUES}
      validate={values => validateSignUpForm(values)}
      onSubmit={(values, { setSubmitting }) => handleClickNext(values, setSubmitting)}
    >
       {({ isSubmitting, isValid, dirty }) => (
         <Form>
          <FormField data-testid="firstNameField" type="text" name="firstName" placeholder="First Name"/>
           <ErrorMessage name="firstName" component={FormValidationMessage} />
           <FormField  data-testid="emailField" type="email" name="email"  placeholder="E-mail"/>
           <ErrorMessage data-testid="emailError" name="email" component={FormValidationMessage} />
           <FormField  data-testid="passwordField" type="password" name="password" placeholder="Password"/>
           <ErrorMessage name="password" component={FormValidationMessage} />
           <ButtonWrapper>
            <Button data-testid="nextButton" type="submit" disabled={isSubmitting || !isValid || !dirty}>
              Next
            </Button>
          </ButtonWrapper>
         </Form>
       )}
     </Formik>
  )
}