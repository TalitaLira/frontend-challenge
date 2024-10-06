import React from "react";
import { SignUpForm } from "../../components/sign-up-form";
import { FormWrapper, FormTitle } from "../../components/styles";

export const SignUpPage = () => {

  return (
    <FormWrapper>
      <FormTitle>Sign Up</FormTitle>
      <SignUpForm />
    </ FormWrapper>
  )
}