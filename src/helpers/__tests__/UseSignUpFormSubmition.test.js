import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSignUpForSubmition } from '../useSignUpFormSubmition.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSubmitSignUpFormMutation } from '../../services/sign-up-form'
import { updateIsFormSubmitted } from '../../store/slices/signUpSlice';

// Mock useNavigate from React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock useDispatch from React Redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mock useSubmitSignUpFormMutation from the API service
jest.mock('../../services/sign-up-form', () => ({
  useSubmitSignUpFormMutation: jest.fn(),
}));

// Test component that uses the hook
const TestComponent = ({ formData }) => {
  const { handleSubmitSignUpForm } = useSignUpForSubmition();

  return (
    <button onClick={() => handleSubmitSignUpForm(formData)}>Submit</button>
  );
};

describe('useSignUpForSubmition', () => {
  let mockNavigate;
  let mockDispatch;
  let mockSubmitSignUpForm;

  beforeEach(() => {
    mockNavigate = jest.fn();
    mockDispatch = jest.fn();
    mockSubmitSignUpForm = jest.fn();

    (useNavigate).mockReturnValue(mockNavigate);
    (useDispatch).mockReturnValue(mockDispatch);
    (useSubmitSignUpFormMutation).mockReturnValue([mockSubmitSignUpForm]);

    jest.clearAllMocks();
  });

  it('should call the API and navigate to /success on successful submission', async () => {
    const formData = {
      name: 'Talita',
      email: 'talita@example.com',
      password: 'admin123',
      color: 'blue',
      terms: true,
      isFormSubmitted: false,
    };

    // Mock successful API call
    mockSubmitSignUpForm.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({}),
    });

    render(<TestComponent formData={formData} />);

    // Click on submit button
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Verify that the dispatch function was called to set the form as submitted
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(updateIsFormSubmitted({ isFormSubmitted: true }));
    });

    // Verify that the API call was made with the correct formData
    expect(mockSubmitSignUpForm).toHaveBeenCalledWith(formData);

    // Verify if user navigates to success page
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/success');
    });
  });

  it('should navigate to /error on API call failure', async () => {
    const formData = {
      name: 'Talita',
      email: 'talita@example.com',
      password: 'admin123',
      color: 'blue',
      terms: true,
      isFormSubmitted: false,
    };

    // Mock API call to reject
    mockSubmitSignUpForm.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(new Error('API error')),
    });

    render(<TestComponent formData={formData} />);

    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Verify that the dispatch function was called to set the form as submitted
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(updateIsFormSubmitted({ isFormSubmitted: true }));
    });

    // Verify that the API call was made with the correct formData
    expect(mockSubmitSignUpForm).toHaveBeenCalledWith(formData);

    // Verify if user navigates to error page
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/error');
    });
  });
});