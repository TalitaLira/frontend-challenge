import { FormTitle, Button, InformativeText, ButtonWrapper } from "../../components/styles";

export const InformativeTemplate = ({title, message}) => {
  const restartForm = () => {
    //to do navigation
  }

  return (
    <>
      <FormTitle>{title}</FormTitle>
      <InformativeText>{message}</InformativeText>
      <ButtonWrapper>
        <Button onClick={() => restartForm()}>Restart</Button>
      </ButtonWrapper>
    </>
  )
}