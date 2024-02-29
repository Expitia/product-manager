import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import {
    fireEvent,
    queryHelpers,
    render,
    waitFor,
} from "@testing-library/react";
import Redux from "react-redux";
import FormCategory from "../src/views/FormCategory";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} from "./../src/app/libs/redux/services/categories";
import { getCategoryData } from "./../src/app/libs/redux/slices/manager";

// Mocking Redux hooks and API calls
jest.mock("./../src/app/libs/redux/services/categories", () => ({
  useCreateCategoryMutation: jest.fn(() => [jest.fn(), { loading: false }]),
  useUpdateCategoryMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));

jest.mock("./../src/app/libs/redux/slices/manager", () => ({
  getCategoryData: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("CreateCategory component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<FormCategory onFinish={() => {}} />);
  });

  it("submits form with valid input", async () => {
    const { getByText, baseElement } = render(
      <FormCategory onFinish={() => {}} />
    );
    const nameInput = queryHelpers.queryByAttribute("id", baseElement, "name")!;
    fireEvent.change(nameInput, { target: { value: "New Category" } });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(useCreateCategoryMutation).toHaveBeenCalled();
    });
  });

  it("disables submit button with invalid input", async () => {
    const { baseElement, getByText } = render(
      <FormCategory onFinish={() => {}} />
    );
    const nameInput = queryHelpers.queryByAttribute("id", baseElement, "name")!;
    fireEvent.change(nameInput, { target: { value: "" } });
    const submitButton = getByText("Submit");
    expect(submitButton).toBeDisabled();
  });

  it("calls update categories mutation when current product exists", async () => {
    const mockCurrentProduct = {
      _id: "123",
      name: "Existing Product",
      description: "Existing Description",
    };
    jest.spyOn(Redux, "useSelector").mockImplementation((selector) => {
      if (selector === getCategoryData) return mockCurrentProduct;
      return null;
    });

    const { getByText } = render(<FormCategory onFinish={() => {}} />);

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(useUpdateCategoryMutation).toHaveBeenCalled();
    });
  });
});
