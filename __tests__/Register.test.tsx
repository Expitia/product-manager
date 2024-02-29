import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import {
    fireEvent,
    queryHelpers,
    render,
    waitFor,
} from "@testing-library/react";
import Redux from "react-redux";
import Register from "../src/views/Register";
import { useRegisterMutation } from "./../src/app/libs/redux/services/users";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(() => []),
}));

jest.mock("./../src/app/libs/redux/services/users", () => ({
  useRegisterMutation: jest.fn(() => [() => ({}), { loading: false }]),
}));

describe("Register component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Register />);
  });

  it("displays error message for invalid email", async () => {
    const { baseElement, getByText } = render(<Register />);
    const emailInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "email"
    )!;
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    await waitFor(() => {
      expect(getByText("The email format is invalid")).toBeInTheDocument();
    });
  });

  it("displays error message for invalid password", async () => {
    const { baseElement, getByText } = render(<Register />);
    const passwordInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "password"
    )!;
    fireEvent.change(passwordInput, { target: { value: "invalid" } });
    await waitFor(() => {
      expect(
        getByText("The password must have at least 8 characters")
      ).toBeInTheDocument();
    });
  });

  it("displays error message for password mismatch", async () => {
    const { baseElement, getByText } = render(<Register />);

    jest.spyOn(Redux, "useSelector").mockImplementation(() => false);

    const passwordInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "password"
    )!;
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    const confirmPasswordInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "confirmPassword"
    )!;
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password456" },
    });
    await waitFor(() => {
      expect(getByText("The passwords don't match")).toBeInTheDocument();
    });
  });

  it("submits form with valid input", async () => {
    const { baseElement, getByText } = render(<Register />);
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
    const confirmPasswordInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "confirmPassword"
    )!;
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123!" },
    });
    const adminInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "admin"
    )!;
    fireEvent.click(adminInput);

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(useRegisterMutation).toHaveBeenCalled();
    });
  });
});
