import { css } from "@emotion/react";

type Props = {
  label: string;
  value: string;
  onChangeHandler: (value: string) => void;
  placeholder: string;
  id: string;
};

export const Input = ({
  label,
  value,
  onChangeHandler,
  placeholder,
  id,
}: Props) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <label
        css={css`
          width: 100%;
          display: block;
          text-align: left;
        `}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          event.preventDefault();
          onChangeHandler(event.target.value);
        }}
        css={css`
          width: 100%;
          padding: 5px;
          border: 1px solid #000;
          border-radius: 5px;
          color: #000;
        `}
      />
    </div>
  );
};
