import React from "react";
import { useSelector } from "react-redux";
import { FormWrapper, FormTitle, ButtonWrapper, Button } from "../../common/styles";
import { List, ListItem } from "./styles.js";
import { useSignUpForSubmition } from "../../helpers/useSignUpFormSubmition";
import { useNavigate } from 'react-router-dom';
import { Spinner } from "../../common/styles.js"

export const ConfirmationPage = () => {
  const { value } = useSelector((state) => state.signUpForm);
  const { name, email, password, color, terms, isFormSubmitted } = value;
  const { handleSubmitSignUpForm } = useSignUpForSubmition();
  const navigate = useNavigate();

  const getTerms = terms ? 'Agreed' : 'Not Agreed';

  const handleOnClickSubmit = () => {
    const formData = {name, email, password, color, terms: !!terms.length};
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
            <ListItem>Password: {password ? '****' : null}</ListItem>
            <ListItem>Favorite Color: {color}</ListItem>
            <ListItem>Terms and Conditions: {getTerms}</ListItem>
          </List>

          <ButtonWrapper>
            <Button onClick={() => navigate(-1)}>
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