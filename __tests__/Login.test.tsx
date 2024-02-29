import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { fireEvent, queryHelpers, render } from "@testing-library/react";
import Login from "../src/views/Login";

describe("Login component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Login />);
  });

  it("can submits form with valid input", async () => {
    const { baseElement, getByText } = render(<Login />);
    const emailInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "email"
    )!;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "password"
    )!;
    fireEvent.change(passwordInput, { target: { value: "password123!" } });
    const submitButton = getByText("Sign In");
    expect(submitButton).toBeEnabled();
  });

  it("disables submit button with invalid inputs", async () => {
    const { getByText } = render(<Login />);
    const submitButton = getByText("Sign In");
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });

  it("disables submit button with invalid email", async () => {
    const { baseElement, getByText } = render(<Login />);
    const emailInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "email"
    )!;
    fireEvent.change(emailInput, { target: { value: "test" } });
    const passwordInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "password"
    )!;
    fireEvent.change(passwordInput, { target: { value: "12345678q!" } });
    const submitButton = getByText("Sign In");
    expect(submitButton).toBeDisabled();
  });

  it("disables submit button with invalid password", async () => {
    const { baseElement, getByText } = render(<Login />);
    const emailInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "email"
    )!;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "password"
    )!;
    fireEvent.change(passwordInput, { target: { value: "" } });
    const submitButton = getByText("Sign In");
    expect(submitButton).toBeDisabled();
  });

  it("enable navigation to registration page", () => {
    const { getByText } = render(<Login />);
    const registerButton = getByText("Register");
    fireEvent.click(registerButton);
  });
});
