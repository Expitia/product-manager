import { ReactNode } from "react";
import "./styles.css";

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal(props: ModalProps) {
  return (
    <div className="modal">
      <div className="content">
        <span className="close" onClick={props.onClose}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
}
