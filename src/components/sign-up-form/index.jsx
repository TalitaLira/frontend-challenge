import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import { SIGN_UP_INITIAL_VALUES, validateSignUpForm } from "../../helpers/form-validation";
import { ButtonWrapper, Button, FormValidationMessage } from "../../common/styles";
import { FormField } from "./styles.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addSignUpInitialInfo } from "../../store/slices/signUpSlice.js";
import { encryptPass } from "../../utils/encryptPass.js"
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
    const encryptedPassword = encryptPass(password);
    dispatch(addSignUpInitialInfo({ name, email, password: encryptedPassword }))
    setSubmitting(false);
    navigate('/more-info');
  }

  return (
    <Formik
       initialValues={isThereValuesStored ? SIGN_UP_STORED_VALUES : SIGN_UP_INITIAL_VALUES}
       validate={values => validateSignUpForm(values)}
       onSubmit={(values, { setSubmitting }) => handleClickNext(values, setSubmitting)}
     >
       {({ isSubmitting }) => (
         <Form>
          <FormField type="text" name="firstName" placeholder="First Name"/>
           <ErrorMessage name="firstName" component={FormValidationMessage} />
           <FormField type="email" name="email"  placeholder="E-mail"/>
           <ErrorMessage name="email" component={FormValidationMessage} />
           <FormField type="password" name="password"  placeholder="Password"/>
           <ErrorMessage name="password" component={FormValidationMessage} />
           <ButtonWrapper>
            <Button type="submit" disabled={isSubmitting}>
              Next
            </Button>
          </ButtonWrapper>
         </Form>
       )}
     </Formik>
  )
}