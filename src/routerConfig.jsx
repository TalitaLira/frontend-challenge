import { createBrowserRouter, redirect } from 'react-router-dom';
import { MoreInfoPage } from "./pages/more-info";
import { ConfirmationPage } from "./pages/confirmation";
import { SuccessPage } from "./pages/success";
import { ErrorPage } from "./pages/error";
import App from "./App";
import { isInitialSignUpValuesFilledUp, isMoreInfoFilledUp, isFormSubmitted } from "./helpers/checkForSignUpValues.js";

export const routerConfig = createBrowserRouter([
  {path: '/', element: <App/>},
  { 
    path: '/more-info',
    element: <MoreInfoPage/>,
    loader: async () => {
      const isPreviousStepDone = isInitialSignUpValuesFilledUp();
      if (!isPreviousStepDone) {
        throw redirect('/'); // Previous step wasn't filled up
      }
      return null;
    }
  },
  {
    path: '/confirmation',
    element: <ConfirmationPage/>,
    loader: async () => {
      const isPreviousStepDone = isMoreInfoFilledUp();
      if (!isPreviousStepDone) {
        throw redirect('/more-info'); // Previous step wasn't filled up
      }
      return null;
    }
  },
  {
    path: '/success',
    element: <SuccessPage/>,
    loader: async () => {
      const isSubmitted = isFormSubmitted();
      if (!isSubmitted) {
        throw redirect('/'); // No form recently submitted
      }
      return null;
    }
  },
  {
    path: '/error',
    element: <ErrorPage/>,
    loader: async () => {
      const isSubmitted = isFormSubmitted();
      if (!isSubmitted) {
        throw redirect('/'); // No form recently submitted
      }
      return null;
    }
  },
]);
