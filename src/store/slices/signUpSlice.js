import { createSlice } from "@reduxjs/toolkit";

const INITIAL_SIGN_UP_STATE = {
  name: "",
  email: "",
  password: "",
  color: "",
  terms: false,
  isFormSubmitted: false,
}

export const signUpSlice = createSlice({
  name: "signUpForm",
  initialState: {
    value: INITIAL_SIGN_UP_STATE
  },
  reducers: {
    addSignUpInitialInfo: (state, action) => {
      state.value = {
        ...state.value, 
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
      }
    },
    addMoreInfo: (state, action) => {
      state.value = {
        ...state.value, 
        color: action.payload.color,
        terms: action.payload.terms,
      }
    },
    updateIsFormSubmitted: (state, action) => {
      state.value = {
        ...INITIAL_SIGN_UP_STATE, 
        isFormSubmitted: action.payload.isFormSubmitted,
      }
    },
  }
})

export const { addSignUpInitialInfo, addMoreInfo, updateIsFormSubmitted } = signUpSlice.actions;

export default signUpSlice.reducer;