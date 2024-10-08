import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ConfirmationPage } from '../index.jsx';
import configureStore from 'redux-mock-store';
import { replacePassForSymbols } from '../../../utils/encryptPass.js'
 
// Mocking useNavigate from React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock the useSignUpForSubmission hook
jest.mock('../../../helpers/useSignUpFormSubmission', () => ({
  useSignUpForSubmission: () => ({
    handleSubmitSignUpForm: jest.fn(), // Mock function
  }),
}));

const mockStore = configureStore([]);
const initialState = {
  signUpForm: {
    value: {
      name: 'Talita',
      email: 'talita@example.com',
      password: 'admin123',
      color: 'blue',
      terms: true,
      isFormSubmitted: false,
    },
  },
};

describe('ConfirmationPage', () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = mockStore(initialState);
    mockNavigate = jest.fn();
    (useNavigate).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConfirmationPage />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should display all information from formData on the screen', () => {
    const { name, email, password, color, terms } = initialState.signUpForm.value;
    expect(screen.getByText(`First Name: ${name}`)).toBeInTheDocument();
    expect(screen.getByText(`E-mail: ${email}`)).toBeInTheDocument();
    expect(screen.getByText(`Password: ${replacePassForSymbols(password, '*')}`)).toBeInTheDocument();
    expect(screen.getByText(`Favorite Color: ${color}`)).toBeInTheDocument();
    expect(screen.getByText(`Terms and Conditions: ${terms ? 'Agreed' : 'Not Agreed'}`)).toBeInTheDocument();
  });

  it('should navigate to "/more-info" when the "Back" button is clicked', async () => {
    const backButton = screen.getByTestId('backButton');

    fireEvent.click(backButton);

    // Verify that navigate function was called with "/more-info"
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
