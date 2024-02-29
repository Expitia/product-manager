import { useContext } from "react";
import { DragAndDropContext } from "../..";
import CardItem, { CardItemProps } from "../CardItem";
import "./styles.css";

export interface ContainerCardsProps {
  name: string;
  id: string;
  products: CardItemProps[];
}

export default function ContainerCards(props: ContainerCardsProps) {
  const context = useContext(DragAndDropContext);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const cardId = event.dataTransfer.getData("text");
    event.preventDefault();
    context?.onDrag(cardId, props.id);
    context?.onDragging?.(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault();

  return (
    <div className="container" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="container-header">
        <h3 title={props.name}>{props.name}</h3>
        <div className="action">
          {context?.onAddCard && (
            <button
              className="icon xl"
              title="Add Product"
              onClick={() => context?.onAddCard?.(props.id)}
            >
              +
            </button>
          )}

          {context?.onEditCategory && (
            <button
              className="icon green"
              title="Edit Category"
              onClick={() => context?.onEditCategory?.(props.id)}
            >
              &#9999;
            </button>
          )}

          {context?.onDeleteCategory && (
            <button
              className="icon red"
              title="Delete Category"
              onClick={() => context?.onDeleteCategory?.(props.id)}
            >
              x
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="container-content">
        {props.products.map(
          (item) =>
            item.categoryId === props.id && (
              <CardItem {...item} key={item._id} />
            )
        )}
      </div>
    </div>
  );
}
