import FormProduct from "@/views/FormProduct";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import {
  fireEvent,
  queryHelpers,
  render,
  waitFor,
} from "@testing-library/react";
import Redux from "react-redux";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "./../src/app/libs/redux/services/products";
import { getProductData } from "./../src/app/libs/redux/slices/manager";

jest.mock("./../src/app/libs/redux/services/products", () => ({
  useCreateProductMutation: jest.fn(() => [jest.fn(), { loading: false }]),
  useUpdateProductMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));

jest.mock("./../src/app/libs/redux/slices/manager", () => ({
  getProductData: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("CreateCard component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<FormProduct onFinish={() => {}} />);
  });

  it("submits form with valid input", async () => {
    const { baseElement, getByText } = render(
      <FormProduct onFinish={() => {}} />
    );
    const nameInput = queryHelpers.queryByAttribute("id", baseElement, "name")!;
    fireEvent.change(nameInput, { target: { value: "New Product" } });
    const descriptionInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "description"
    )!;
    fireEvent.change(descriptionInput, {
      target: { value: "Product Description" },
    });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(useCreateProductMutation).toHaveBeenCalled();
    });
  });

  it("disables submit button with invalid description input", async () => {
    const { baseElement, getByText } = render(
      <FormProduct onFinish={() => {}} />
    );
    const nameInput = queryHelpers.queryByAttribute("id", baseElement, "name")!;
    fireEvent.change(nameInput, { target: { value: "New Product" } });
    const descriptionInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "description"
    )!;
    fireEvent.change(descriptionInput, {
      target: { value: "" },
    });
    const submitButton = getByText("Submit");
    expect(submitButton).toBeDisabled();
  });

  it("disables submit button with invalid name input", async () => {
    const { baseElement, getByText } = render(
      <FormProduct onFinish={() => {}} />
    );
    const nameInput = queryHelpers.queryByAttribute("id", baseElement, "name")!;
    fireEvent.change(nameInput, { target: { value: "" } });
    const descriptionInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "description"
    )!;
    fireEvent.change(descriptionInput, {
      target: { value: "Product Description" },
    });
    const submitButton = getByText("Submit");
    expect(submitButton).toBeDisabled();
  });

  it("calls update production mutation when current product exists", async () => {
    const mockCurrentProduct = {
      _id: "123",
      name: "Existing Product",
      description: "Existing Description",
    };
    jest.spyOn(Redux, "useSelector").mockImplementation((selector) => {
      if (selector === getProductData) return mockCurrentProduct;
      return null;
    });

    const { getByText } = render(<FormProduct onFinish={() => {}} />);

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(useUpdateProductMutation).toHaveBeenCalled();
    });
  });

  it("calls onFinish callback after successful form submission", async () => {
    const onFinishMock = jest.fn();
    const { baseElement, getByText } = render(
      <FormProduct onFinish={onFinishMock} />
    );

    const nameInput = queryHelpers.queryByAttribute("id", baseElement, "name")!;
    fireEvent.change(nameInput, { target: { value: "New Product" } });
    const descriptionInput = queryHelpers.queryByAttribute(
      "id",
      baseElement,
      "description"
    )!;
    fireEvent.change(descriptionInput, {
      target: { value: "Product Description" },
    });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onFinishMock).toHaveBeenCalled();
    });
  });
});
