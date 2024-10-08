
import { useSubmitSignUpFormMutation } from "../services/sign-up-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateIsFormSubmitted } from "../store/slices/signUpSlice.js"

export const useSignUpForSubmition = () => {
  const [ submitSignUpForm ] = useSubmitSignUpFormMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleSubmitSignUpForm = async (formData) => {
    dispatch(updateIsFormSubmitted({ isFormSubmitted: true }))
    try {
      await submitSignUpForm(formData).unwrap();
      navigate('/success');
    } catch (err) {
      navigate('/error');
    }
  }

  return {
    handleSubmitSignUpForm,
  }
}