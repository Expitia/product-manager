import { ChangeEvent, useState } from "react";
import "./styles.css";

export interface InputRuleProps {
  id: string;
  type: string;
  title: string;
  name?: string;
  role?: string;
  trim?: boolean;
  value?: string;
  checked?: boolean;
  required?: boolean;
  rules?: Record<string, RegExp>;
  onChange: (value: string, error: string) => void;
}

export default function InputRule(props: InputRuleProps) {
  const [error, setError] = useState<string>();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    let error = "";
    let value = event.target.value;

    if (props.trim) value = value.trim();

    for (const currentError in props.rules) {
      const rule = props.rules[currentError];
      if (!rule.test(value)) error = currentError;
    }

    setError(error);
    props.onChange(value, error);
    event.target.setCustomValidity(error);
  };

  return (
    <div>
      <label htmlFor={props.id}>
        {props.required && <span className="required">*</span>}
        {props.title}
      </label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        role={props.role}
        value={props.value}
        checked={props.checked ?? false} // Prevent uncontrolled warning
        onChange={handleInput}
      />
      {error && <div className="message error">{error}</div>}
    </div>
  );
}
