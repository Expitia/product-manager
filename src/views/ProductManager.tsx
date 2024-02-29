"use client";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/app/libs/redux/services/categories";
import {
  useAssignProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/app/libs/redux/services/products";
import { setCategory, setProduct } from "@/app/libs/redux/slices/manager";
import DragAndDrop from "@/components/DragAndDrop";
import Modal from "@/components/Modal";
import { RequestManager } from "@/components/RequestManager";
import Toolbar from "@/components/Toolbar";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FormCategory from "./FormCategory";
import FormProduct from "./FormProduct";

export default function ProductManager() {
  const [filterText, setFilterText] = useState<string>("");
  const [modalProduct, setModalProduct] = useState<boolean>(false);
  const [modalCategory, setModalCategory] = useState<boolean>(false);
  const requestProducts = useGetProductsQuery(filterText);
  const requestCategories = useGetCategoriesQuery("");
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [assignCard] = useAssignProductMutation();
  const dispatch = useDispatch();

  return (
    <>
      <Toolbar title="Product Manager">
        <RequestManager />
        <button
          className="m"
          onClick={() => {
            setModalCategory(true);
            dispatch(setCategory(undefined));
          }}
        >
          Add Category
        </button>
        <button className="sm" onClick={() => signOut()}>
          Sign Out
        </button>
        <input
          value={filterText}
          className="no-margin"
          placeholder="Search Product Name..."
          onChange={(event) => setFilterText(event.target.value)}
        />
      </Toolbar>
      <DragAndDrop
        products={requestProducts.data?.data ?? []}
        categories={requestCategories.data?.data ?? []}
        onAddCard={(category: string) => {
          setModalProduct(true);
          dispatch(setProduct(undefined));
          dispatch(setCategory(category));
        }}
        onEditCard={(product: string) => {
          setModalProduct(true);
          dispatch(setProduct(product));
          dispatch(setCategory(undefined));
        }}
        onEditCategory={(category: string) => {
          setModalCategory(true);
          dispatch(setCategory(category));
        }}
        onDrag={async (product: string, category: string) => {
          await assignCard({
            id: product,
            categoryId: category,
          });
          requestProducts.refetch();
          requestCategories.refetch();
        }}
        onDeleteCard={async (id: string) => {
          await deleteProduct(id);
          requestProducts.refetch();
          requestCategories.refetch();
        }}
        onDeleteCategory={async (id: string) => {
          await deleteCategory(id);
          requestProducts.refetch();
          requestCategories.refetch();
        }}
      />

      {modalProduct && (
        <Modal onClose={() => setModalProduct(false)}>
          <FormProduct
            onFinish={() => {
              setModalProduct(false);
              requestProducts.refetch();
              requestCategories.refetch();
            }}
          />
        </Modal>
      )}
      {modalCategory && (
        <Modal onClose={() => setModalCategory(false)}>
          <FormCategory
            onFinish={() => {
              setModalCategory(false);
              requestProducts.refetch();
              requestCategories.refetch();
            }}
          />
        </Modal>
      )}
    </>
  );
}
