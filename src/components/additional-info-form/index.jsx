import React from "react";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { ADDITIONAL_INFO_INITIAL_VALUES, validateAdditionalInfoForm } from "../../helpers/form-validation";
import { useGoBack } from "../../utils/useGoBack";
import { FormField, ButtonWrapper, Button, FieldsWrapper } from "../../components/styles";
import { useNavigate } from 'react-router-dom';

export const AdditionalInfoForm = () => {
  const navigate = useNavigate();

  const handleClickNext = (values, setSubmitting) => {
    console.log(values)
    setSubmitting(false);
    navigate('/confirmation');
  }

  const goBack = useGoBack('/');

  return (
    <Formik
       initialValues={ADDITIONAL_INFO_INITIAL_VALUES}
       validate={values => validateAdditionalInfoForm(values)}
       onSubmit={(values, { setSubmitting }) => handleClickNext(values, setSubmitting)}
     >
      {({ isSubmitting, values }) => (
        <Form>
          <FormField as="select" name="selectColor">
            <option value="">Select your favorite color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </FormField>
          <ErrorMessage name="selectColor" component="div" />

          <FieldsWrapper role="group" aria-labelledby="checkbox-group">
            <label>
              <Field type="checkbox" name="terms" value="termsAgreed" />
              I agree to Terms and Conditions
            </label>
          </FieldsWrapper>
          <ErrorMessage name="terms" component="div" />
          <ButtonWrapper>
            <Button onClick={goBack}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting || values.terms.length == 0}>
              Next
            </Button>
          </ButtonWrapper>
        
        </Form>
      )}
     </Formik>
  )
}