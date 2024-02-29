"use client";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/app/libs/redux/services/products";
import {
  getCategoryData,
  getProductData,
} from "@/app/libs/redux/slices/manager";
import InputRule from "@/components/InputRules";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface FormProductProps {
  onFinish: () => void;
}

const FormProduct = (props: FormProductProps) => {
  const currentProduct = useSelector(getProductData);
  const currentCategory = useSelector(getCategoryData);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setName(currentProduct?.name ?? "");
    setDescription(currentProduct?.description ?? "");
  }, [currentProduct]);

  const handleName = (value: string, error: string) => {
    errors[0] = error;
    setErrors([...errors]);
    setName(value);
  };

  const handleDescription = (value: string, error: string) => {
    errors[1] = error;
    setErrors([...errors]);
    setDescription(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const method = currentProduct ? updateProduct : createProduct;
    await method({
      name,
      description,
      id: currentProduct?._id,
      categoryId: currentCategory?._id,
    });
    props.onFinish();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Form Product</h2>
        <InputRule
          required
          id="name"
          name="name"
          title="Name"
          type="text"
          value={name}
          rules={{
            "The name must have at least 1 character": /^.{1,}$/,
          }}
          onChange={handleName}
        />
        <InputRule
          required
          id="description"
          title="Description"
          type="text"
          role="textbox"
          value={description}
          rules={{
            "The description must have at least 1 character": /^.{1,}$/,
          }}
          onChange={handleDescription}
        />
        <button
          type="submit"
          disabled={errors.some((item) => item) || !name || !description}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormProduct;
