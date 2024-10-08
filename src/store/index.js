import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from './slices/signUpSlice';
import { signUpFormApi } from '../services/sign-up-form';

export default configureStore({
  reducer: {
    signUpForm: signUpSlice,
    [signUpFormApi.reducerPath]: signUpFormApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signUpFormApi.middleware),
});
