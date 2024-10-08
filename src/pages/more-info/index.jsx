import React from "react";
import { AdditionalInfoForm } from "../../components/additional-info-form";
import { FormWrapper, FormTitle } from "../../common/styles";

export const MoreInfoPage = () => {

  return (
    <FormWrapper>
      <FormTitle>Additional Info</FormTitle>
      <AdditionalInfoForm />
    </ FormWrapper>
  )
}