import React from "react";
import { useSelector } from "react-redux";
import { FormWrapper, FormTitle, ButtonWrapper, Button } from "../../common/styles";
import { List, ListItem } from "./styles.js";
import { useSignUpForSubmission } from "../../helpers/useSignUpFormSubmission";
import { useNavigate } from 'react-router-dom';
import { Spinner } from "../../common/styles.js"
import { replacePassForSymbols } from "../../utils/encryptPass.js"

export const ConfirmationPage = () => {
  const { value: signUpFormValue } = useSelector((state) => state.signUpForm);
  const { name, email, password, color, terms, isFormSubmitted } = signUpFormValue;
  const { handleSubmitSignUpForm } = useSignUpForSubmission();
  const navigate = useNavigate();

  const getTerms = terms ? 'Agreed' : 'Not Agreed';

  const handleOnClickSubmit = () => {
    const formData = {name, email, password, color, terms};
    handleSubmitSignUpForm(formData);
  }

  return (
    <FormWrapper>
      <FormTitle>Confirmation</FormTitle>

      { isFormSubmitted ? <Spinner size={30} /> : (
        <>
          <List>
            <ListItem>First Name: {name}</ListItem>
            <ListItem>E-mail: {email}</ListItem>
            <ListItem>Password: {replacePassForSymbols(password, '*')}</ListItem>
            <ListItem>Favorite Color: {color}</ListItem>
            <ListItem>Terms and Conditions: {getTerms}</ListItem>
          </List>

          <ButtonWrapper>
            <Button data-testid="backButton" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={handleOnClickSubmit}>
              Submit
            </Button>
          </ButtonWrapper>
        </>
      )}
    </FormWrapper>
  )
}