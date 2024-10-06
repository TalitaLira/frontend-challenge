import { createBrowserRouter } from 'react-router-dom';
import { SignUpPage } from "./pages/sign-up"
import { MoreInfoPage } from "./pages/more-info"
import { ConfirmationPage } from "./pages/confirmation"
import { SuccessPage } from "./pages/success"
import { ErrorPage } from "./pages/error"

export const routerConfig = createBrowserRouter([
  {path: '/', element: <SignUpPage/>},
  {path: '/more-info', element: <MoreInfoPage/>},
  {path: '/confirmation', element: <ConfirmationPage/>},
  {path: '/success', element: <SuccessPage/>},
  {path: '/error', element: <ErrorPage/>},
]);
