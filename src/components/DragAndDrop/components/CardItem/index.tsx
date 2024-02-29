import { Product } from "@/interfaces";
import { ReactNode, useContext } from "react";
import { DragAndDropContext } from "../..";
import "./styles.css";

export interface CardItemProps extends Product {
  customActions?: ReactNode;
}

export default function CardItem(props: CardItemProps) {
  const context = useContext(DragAndDropContext);

  const handleDragEnd = () => context?.onDragging?.(false);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", props._id);
    context?.onDragging?.(true);
  };

  return (
    <div
      draggable
      className="product"
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="product-header">
        <h4 title={props.name}>{props.name}</h4>
        <div className="action">
          {context?.onEditCard && (
            <button
              title="Edit Product"
              className="icon green"
              onClick={() => context?.onEditCard?.(props._id)}
            >
              &#9999;
            </button>
          )}

          {context?.onDeleteCard && (
            <button
              title="Delete Product"
              className="icon red"
              onClick={() => context?.onDeleteCard?.(props._id)}
            >
              x
            </button>
          )}
          {props.customActions}
        </div>
      </div>
      <hr />
      <div className="product-body">
        <p>{props.description}</p>
      </div>
      <div className="product-footer">
        <small>{new Date(props.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
}
