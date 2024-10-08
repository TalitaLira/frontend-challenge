
import { useSubmitSignUpFormMutation } from "../services/sign-up-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateIsFormSubmitted } from "../store/slices/signUpSlice.js"
import { encryptPass } from "../utils/encryptPass.js"

export const useSignUpForSubmission = () => {
  const [ submitSignUpForm ] = useSubmitSignUpFormMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleSubmitSignUpForm = async (formData) => {
    dispatch(updateIsFormSubmitted({ isFormSubmitted: true }))
    const formWithEncryptedPass = { ...formData, password: encryptPass(formData.password)}
    try {
      await submitSignUpForm(formWithEncryptedPass).unwrap();
      navigate('/success');
    } catch (err) {
      navigate('/error');
    }
  }

  return {
    handleSubmitSignUpForm,
  }
}