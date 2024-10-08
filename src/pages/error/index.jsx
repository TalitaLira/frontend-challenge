import React from "react";
import { FormWrapper } from "../../common/styles";
import { InformativeTemplate } from "../../components/informative-template";

export const ErrorPage = () => {

  return (
    <FormWrapper>
      <InformativeTemplate 
        title={'Error'} 
        message={'Uh oh, something went wrong. Please try again later.'}
      />
    </FormWrapper>
  )
}