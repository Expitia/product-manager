import "./styles.css";

export interface ToolbarProps {
  title: string;
  children?: React.ReactNode;
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div className="toolbar">
      <span>{props.title}</span>
      <div className="action">{props.children}</div>
    </div>
  );
}
