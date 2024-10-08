import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdditionalInfoForm } from '../index.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const mockStore = configureStore([]);
const initialState = {
  signUpForm: {
    value: {
      color: '',
      terms: '',
    },
  },
};

// Mocking useNavigate from React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));


// Mocking color list and useGetSignUpColorsQuery
const mockColorList = ['red', 'blue', 'green'];
jest.mock('../../../services/sign-up-form', () => ({
  useGetSignUpColorsQuery: () => ({
    data: mockColorList,
    isLoading: false,
  }),
}));

describe('AdditionalInfoForm', () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = mockStore(initialState);
    mockNavigate = jest.fn();
    (useNavigate).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdditionalInfoForm />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render the form fields for selectColor and terms checkbox', () => {
    expect(screen.getByTestId('colorField')).toBeInTheDocument();
    expect(screen.getByTestId('TermsCheckbox')).toBeInTheDocument();
  });

  it('should disable the "Next" button when fields are empty', async () => {
    const nextButton = screen.getByTestId('nextButton');
    expect(nextButton).toBeDisabled();
  });

  it('should enable the "Next" button only when all fields are filled', async () => {
    const nextButton = screen.getByTestId('nextButton');

    // Initially, the "Next" button should be disabled
    expect(nextButton).toBeDisabled();

    fireEvent.change(screen.getByTestId('colorField'), {
      target: { value: 'red' },
    });

    // The "Next" button should still be disabled until the checkbox is checked
    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });

    fireEvent.click(screen.getByTestId('TermsCheckbox'));

    // Now the "Next" button should be enabled since all fields are filled
    await waitFor(() => {
      expect(nextButton).not.toBeDisabled();
    });
  });

  it('should navigate to the root path ("/") when the "Back" button is clicked', async () => {
    const backButton = screen.getByTestId('backButton');

    // Click the back button
    fireEvent.click(backButton);

    // Verify that the navigate function was called with '/'
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  it('should navigate to the "/confirmation" path when the "Next" button is clicked', async () => {
    const nextButton = screen.getByTestId('nextButton');

    // Select both fields

    fireEvent.change(screen.getByTestId('colorField'), {
      target: { value: 'red' },
    });

    fireEvent.click(screen.getByTestId('TermsCheckbox'));

    // Click Next
    fireEvent.click(nextButton);

    // Verify that the navigate function was called with "/confirmation"
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/confirmation');
    });
  });
});
