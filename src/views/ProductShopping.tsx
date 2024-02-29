"use client";
import {
  useAddCarProductMutation,
  useDeleteCarProductMutation,
  useGetCarQuery,
} from "@/app/libs/redux/services/cars";
import { useGetCategoriesQuery } from "@/app/libs/redux/services/categories";
import {
  useAddFavoriteMutation,
  useDeletFavoriteMutation,
  useGetFavoriteQuery,
} from "@/app/libs/redux/services/favorites";
import { useGetProductsQuery } from "@/app/libs/redux/services/products";
import DragAndDrop from "@/components/DragAndDrop";
import { CardItemProps } from "@/components/DragAndDrop/components/CardItem";
import { RequestManager } from "@/components/RequestManager";
import Toolbar from "@/components/Toolbar";
import { signOut } from "next-auth/react";
import { useMemo, useState } from "react";

interface ProductShoppingProps {
  id: string;
}

const FIXED_CATEGORIES = [
  { _id: "favorites", name: "Favorites" },
  { _id: "shoppingCar", name: "Shopping Car" },
];

export const ProductShopping = ({ id: user }: ProductShoppingProps) => {
  const [filterText, setFilterText] = useState<string>("");
  const requestProducts = useGetProductsQuery(filterText);
  const requestCategories = useGetCategoriesQuery("");
  const requestCar = useGetCarQuery({ id: user, text: filterText });
  const requestFavorites = useGetFavoriteQuery({ id: user, text: filterText });
  const [addFavorite] = useAddFavoriteMutation();
  const [addCarProduct] = useAddCarProductMutation();
  const [deleteFavorite] = useDeletFavoriteMutation();
  const [deleteCarProduct] = useDeleteCarProductMutation();

  const handleAddProduct = async (product: string) => {
    await addCarProduct({ user, product });
    requestCar.refetch();
  };

  const handleRemoveProduct = async (product: string) => {
    await deleteCarProduct(product);
    requestCar.refetch();
  };

  const handleAddFavorite = async (product: string) => {
    await addFavorite({ user, product });
    requestFavorites.refetch();
  };

  const handleRemoveFavorite = async (id: string) => {
    await deleteFavorite(id);
    requestFavorites.refetch();
  };

  const handleDragElement = async (id: string, category: string) => {
    if (category === "favorites") handleAddFavorite(id);
    if (category === "shoppingCar") handleAddProduct(id);
  };

  const products: CardItemProps[] = useMemo(() => {
    const fromRequest: CardItemProps[] =
      requestProducts.data?.data?.map((product) => ({
        ...product,
        customActions: (
          <>
            <button
              title="Add Product in Car"
              className="icon blue"
              onClick={() => handleAddProduct(product._id)}
            >
              &#128722;
            </button>
            <button
              title="Add Favorite"
              className="icon green"
              onClick={() => handleAddFavorite(product._id)}
            >
              &#127775;
            </button>
          </>
        ),
      })) ?? [];
    const favorites: CardItemProps[] =
      requestFavorites.data?.data?.map((item) => {
        const [product] = item.products;
        return {
          ...product,
          categoryId: "favorites",
          customActions: (
            <>
              <button
                title="Add Product in Car"
                className="icon blue"
                onClick={() => handleAddProduct(product._id)}
              >
                &#128722;
              </button>
              <button
                title="Remove Favorite"
                className="icon red"
                onClick={() => handleRemoveFavorite(item._id)}
              >
                &#128683;
              </button>
            </>
          ),
        };
      }) ?? [];
    const car: CardItemProps[] =
      requestCar.data?.data?.map((item) => {
        const [product] = item.products;
        return {
          ...product,
          categoryId: "shoppingCar",
          name: `[${item.amount}] ${product.name}`,
          customActions: (
            <>
              <button
                title="Remove Unit"
                className="icon red"
                onClick={() => handleRemoveProduct(item._id)}
              >
                &#128683;
              </button>
            </>
          ),
        };
      }) ?? [];
    return [...fromRequest, ...favorites, ...car];
  }, [requestProducts.data, requestFavorites.data, requestCar.data]);

  return (
    <>
      <Toolbar title="Shopping Car">
        <RequestManager />
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
        visualization="list"
        products={products}
        categories={requestCategories.data?.data ?? []}
        fixedCategories={FIXED_CATEGORIES}
        onDrag={handleDragElement}
      />
    </>
  );
};
