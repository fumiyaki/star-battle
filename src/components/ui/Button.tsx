import { css } from "@emotion/react";

type Props = {
  label: string;
  onClickHandler: () => void;
  disabled: boolean;
};
export const Button = ({ label, onClickHandler, disabled = false }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        onClickHandler();
      }}
      css={css`
        color: #fff;
        margin-top: 32px;
        padding: 8px 64px 8px 64px;
        border-radius: 5px;
        font-weight: bold;
        ${disabled
          ? css`
              background-color: #1db0b039;
            `
          : css`
              background-color: #1db0b0;
            `}
      `}
    >
      {label}
    </button>
  );
};
