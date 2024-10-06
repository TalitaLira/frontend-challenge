import React from "react";
import { FormWrapper } from "../../components/styles";
import { InformativeTemplate } from "../../components/informative-template";

export const SuccessPage = () => {

  return (
     <FormWrapper>
      <InformativeTemplate 
        title={'Success'} 
        message={'You should receive a confirmation e-mail soon.'}
      />
    </FormWrapper>
  )
}