import { Category } from "@/interfaces";
import classNames from "classnames";
import { createContext } from "react";
import ContainerCards from "./components/CardContainer";
import { CardItemProps } from "./components/CardItem";
import "./styles.css";

export const DragAndDropContext = createContext<DragAndDropProps | undefined>(
  undefined
);

export interface DragAndDropProps {
  products: CardItemProps[];
  categories: Category[];
  visualization?: "grid" | "list";
  fixedCategories?: Category[]; // Only for list visualization
  onDrag: (id: string, category: string) => void;
  onAddCard?: (category: string) => void;
  onEditCard?: (id: string) => void;
  onDeleteCard?: (id: string) => void;
  onEditCategory?: (id: string) => void;
  onDeleteCategory?: (id: string) => void;
  onDragging?: (value: boolean) => void;
}

export default function DragAndDrop(props: DragAndDropProps) {
  const { products, categories, fixedCategories, visualization } = props;

  return (
    <DragAndDropContext.Provider value={props}>
      {fixedCategories?.length && visualization === "list" && (
        <div className="list fixeds">
          {fixedCategories.map((container) => (
            <ContainerCards
              id={container._id}
              key={container._id}
              name={container.name}
              products={products}
            />
          ))}
        </div>
      )}
      <div
        className={classNames(visualization ?? "grid", {
          shared: fixedCategories?.length,
        })}
      >
        {categories.map((container) => (
          <ContainerCards
            id={container._id}
            key={container._id}
            name={container.name}
            products={products}
          />
        ))}
      </div>
    </DragAndDropContext.Provider>
  );
}
