import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { SignUpForm } from '../index.jsx';
import configureStore from 'redux-mock-store';import { useNavigate } from 'react-router-dom';

// Mocking useNavigate from React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);
const initialState = {
  signUpForm: {
    value: {
      name: '',
      email: '',
      password: '',
    },
  },
};

describe('SignUpForm', () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = mockStore(initialState);
    mockNavigate = jest.fn();
    (useNavigate).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpForm />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should be rendering the form fields for firstName, email and password', () => {
    expect(screen.getByTestId('firstNameField')).toBeInTheDocument();
    expect(screen.getByTestId('emailField')).toBeInTheDocument();
    expect(screen.getByTestId('passwordField')).toBeInTheDocument();
  });

  it('should require all the fields to be filled in order to enable the "Next" button', async () => {
    // "Next" button should render disabled
    const nextButton = screen.getByTestId('nextButton');
    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });

    // Populate the first name field
    fireEvent.change(screen.getByTestId('firstNameField'), {
      target: { value: 'Talita' },
    });
    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });

    // Populate the email field
    fireEvent.change(screen.getByTestId('emailField'), {
      target: { value: 'talita@gmail.com' },
    });
    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });

    // Populate the password field
    fireEvent.change(screen.getByTestId('passwordField'), {
      target: { value: 'admin1234' },
    });

    await waitFor(() => {
      // At this step the button should be enabled, since all fields are filled up
      expect(nextButton).not.toBeDisabled();
    });
  });

  it('should validate the email field correctly', async () => {
     const emailField = screen.getByTestId('emailField');

      // Enter an invalid email and check if the error message appears
      fireEvent.change(emailField, {
        target: { value: 'invalid-email' },
      });

      // Trigger a blur event to make Formik validate the field
      fireEvent.blur(emailField);

      await waitFor(() => {
        const errorMessage = screen.getByTestId('emailError');
        expect(errorMessage).toHaveTextContent('Invalid e-mail address');
      });

      // Enter a valid email and check if the error message disappears
      fireEvent.change(emailField, {
        target: { value: 'valid.email@example.com' },
      });

      await waitFor(() => {
        const errorMessage = screen.queryByTestId('emailError');
        expect(errorMessage).not.toBeInTheDocument();
      });
  });

  it('should navigate to the "/more-info" path when the "Next" button is clicked', async () => {
    const nextButton = screen.getByTestId('nextButton');

    // Populate the fields

    fireEvent.change(screen.getByTestId('firstNameField'), {
      target: { value: 'Talita' },
    });

    fireEvent.change(screen.getByTestId('emailField'), {
      target: { value: 'talita@gmail.com' },
    });

    fireEvent.change(screen.getByTestId('passwordField'), {
      target: { value: 'admin1234' },
    });

    // Click the "Next" button
    fireEvent.click(nextButton);

    // Verify that the navigate function was called with "/more-info"
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/more-info');
    });
  });
});
