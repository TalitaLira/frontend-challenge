import React from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import { SIGN_UP_INITIAL_VALUES, validateSignUpForm } from "../../helpers/form-validation";
import { FormField, ButtonWrapper, Button } from "../../components/styles";
import { useNavigate } from 'react-router-dom';

export const SignUpForm = () => {
  const navigate = useNavigate();

  const handleClickNext = (values, setSubmitting) => {
    console.log(values)
    setSubmitting(false);
    navigate('/more-info');
  }

  return (
    <Formik
       initialValues={SIGN_UP_INITIAL_VALUES}
       validate={values => validateSignUpForm(values)}
       onSubmit={(values, { setSubmitting }) => handleClickNext(values, setSubmitting)}
     >
       {({ isSubmitting }) => (
         <Form>
          <FormField type="text" name="firstName" placeholder="First Name"/>
           <ErrorMessage name="firstName" component="div" />
           <FormField type="email" name="email"  placeholder="E-mail"/>
           <ErrorMessage name="email" component="div" />
           <FormField type="password" name="password"  placeholder="Password"/>
           <ErrorMessage name="password" component="div" />
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