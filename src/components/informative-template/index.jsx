import { FormTitle, Button, ButtonWrapper } from "../../common/styles";
import { InformativeText } from "./styles";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateIsFormSubmitted } from "../../store/slices/signUpSlice";

export const InformativeTemplate = ({title, message}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const restartForm = () => {
    dispatch(updateIsFormSubmitted({ isFormSubmitted: false }))
    navigate('/');
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