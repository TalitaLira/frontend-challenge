import React from "react";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { ADDITIONAL_INFO_INITIAL_VALUES, validateAdditionalInfoForm } from "../../helpers/form-validation";
import { ButtonWrapper, Button, FormValidationMessage, Spinner } from "../../common/styles.js";
import { FieldsWrapper, DropdownWrapper } from "./styles.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addMoreInfo } from "../../store/slices/signUpSlice.js";
import { useGetSignUpColorsQuery } from "../../services/sign-up-form.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const AdditionalInfoForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.signUpForm);
  const { color: storedColor, terms: storedTerms} = value;
  const MORE_INFO_STORED_VALUES = {
  selectColor: storedColor,
  terms: storedTerms
};

const isThereValuesStored = MORE_INFO_STORED_VALUES.selectColor && MORE_INFO_STORED_VALUES.terms?.length;

  const { data: colorList = [], isLoading } = useGetSignUpColorsQuery()

  const handleClickNext = (values, setSubmitting) => {
    const { selectColor: color, terms } = values;
    dispatch(addMoreInfo({ color, terms }))
    setSubmitting(false);
    navigate('/confirmation');
  }

  if(isLoading || colorList.length == 0) {
    return <Spinner size={30} />
  }

  return (
    <Formik
       initialValues={isThereValuesStored ? MORE_INFO_STORED_VALUES : ADDITIONAL_INFO_INITIAL_VALUES}
       validate={values => validateAdditionalInfoForm(values)}
       onSubmit={(values, { setSubmitting }) => handleClickNext(values, setSubmitting)}
     >
      {({ isSubmitting, values, isValid, dirty }) => (
        <Form>
          <DropdownWrapper>
            <Field data-testid="colorField" as="select" name="selectColor">
              <option value="">Select your favorite color</option>
              {colorList.length > 0 && colorList.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </Field>
          </DropdownWrapper>
          <ErrorMessage name="selectColor" component={FormValidationMessage} />

          <FieldsWrapper role="group" aria-labelledby="checkbox-group">
            <label>
              <Field data-testid="TermsCheckbox" type="checkbox" name="terms" value="termsAgreed" />
              I agree to  <Link>Terms and Conditions</Link>
            </label>
          </FieldsWrapper>
          <ErrorMessage name="terms" component={FormValidationMessage} />
          <ButtonWrapper>
            <Button data-testid="backButton" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button data-testid="nextButton" type="submit" disabled={isSubmitting || values.terms.length == 0 || !isValid || (!dirty && !isValid)}>
              Next
            </Button>
          </ButtonWrapper>
        
        </Form>
      )}
     </Formik>
  )
}