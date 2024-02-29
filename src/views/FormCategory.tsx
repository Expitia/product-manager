"use client";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/app/libs/redux/services/categories";
import { getCategoryData } from "@/app/libs/redux/slices/manager";
import InputRule from "@/components/InputRules";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface FormCategoryProps {
  onFinish: () => void;
}

const FormCategory = (props: FormCategoryProps) => {
  const currentCategory = useSelector(getCategoryData);
  const [createProduct] = useCreateCategoryMutation();
  const [updateProduct] = useUpdateCategoryMutation();

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setName(currentCategory?.name ?? "");
  }, [currentCategory]);

  const handleName = (value: string, error?: string) => {
    setError(error);
    setName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const method = currentCategory ? updateProduct : createProduct;
    await method({
      name,
      id: currentCategory?._id,
    });
    props.onFinish();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Form Category</h2>
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
        <button type="submit" disabled={!!error || !name}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormCategory;
