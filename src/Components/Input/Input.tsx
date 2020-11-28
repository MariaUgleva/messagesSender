import React from "react";
import { InputType} from "../../type";
const Error: React.FC = (): JSX.Element => {
  return <div className="error__message">Email не может быть пустым</div>;
};
type Props = {
  id: string;
  label: string;
};
const Wrapper: React.FC<Props> = ({ id, label, children }): JSX.Element => {
  return (
    <div className={`input__box ${id}`}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
};
const Input: React.FC<InputType> = ({
  type,
  label,
  value,
  id,
  onChange,
  placeholder,
  errors,
}): JSX.Element => {
  if (type === "textarea") {
    return (
      <Wrapper id={id} label={label}>
        <textarea
          rows={6}
          className={`input__field input__${id}`}
          id={id}
          value={value}
          name="textarea"
          onChange={onChange}
          placeholder={placeholder}
        ></textarea>
      </Wrapper>
    );
  }
  return (
    <Wrapper id={id} label={label}>
      <input
        className={`input__field input__${id}`}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {errors ? (
        id === "senderEmail" ? (
          errors.senderError ? (
            <Error />
          ) : null
        ) : null
      ) : null}
      {errors ? (
        id === "recipientEmail" ? (
          errors.recipientError ? (
            <Error />
          ) : null
        ) : null
      ) : null}
    </Wrapper>
  );
};
export default Input;
