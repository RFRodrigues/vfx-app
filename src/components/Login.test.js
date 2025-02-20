import { render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom"; // We need Routes and Route
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

// Mock the `useNavigate` hook from react-router-dom
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));

test("renders login form with correct inputs and button", () => {
  render(
    <MemoryRouter>
      <Login setIsAuthenticated={jest.fn()} />
    </MemoryRouter>
  );

  // Check if the input fields are rendered
  expect(screen.getByPlaceholderText("CLIENT ID")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("USER ID")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

  // Check if the sign-in button is rendered
  expect(screen.getByRole("button", { name: /Sign me in/i })).toBeInTheDocument();
});

test("displays error when fields are empty or password is too short", async () => {
  render(
    <MemoryRouter>
      <Login setIsAuthenticated={jest.fn()} />
    </MemoryRouter>
  );

  // Submit the form without entering any data
  const submitButton = screen.getByRole("button", { name: /Sign me in/i });
  userEvent.click(submitButton);

  // Wait for error message
  await waitFor(() => {
    expect(screen.getByText(/All fields are required and password must be at least 6 characters./)).toBeInTheDocument();
  });
});

test("displays error when password is too short", async () => {
  render(
    <MemoryRouter>
      <Login setIsAuthenticated={jest.fn()} />
    </MemoryRouter>
  );

  // Enter valid CLIENT ID and USER ID but a short password
  userEvent.type(screen.getByPlaceholderText("CLIENT ID"), "client123");
  userEvent.type(screen.getByPlaceholderText("USER ID"), "user123");
  userEvent.type(screen.getByPlaceholderText("Password"), "123");

  // Submit the form
  const submitButton = screen.getByRole("button", { name: /Sign me in/i });
  userEvent.click(submitButton);

  // Check that the error message is displayed
  await waitFor(() => {
    expect(screen.getByText(/All fields are required and password must be at least 6 characters./)).toBeInTheDocument();
  });
});

