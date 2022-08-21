import { css } from "@emotion/react";

type Props = {
  stargazerCount: number | null;
  nameWithOwner: string | null;
  color: "black" | "white";
  victory: boolean;
};

export const BattleResult = ({
  nameWithOwner,
  stargazerCount,
  color,
  victory,
}: Props) => {
  const centerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1ch;
  `;
  const colorStyle =
    color === "black"
      ? css`
          background-color: #fff;
          color: #192638;
        `
      : css`
          background-color: #192638;
          color: #fff;
        `;
  return (
    <div
      css={css`
        ${centerStyle}
        ${colorStyle}
        width: 50%;
      `}
    >
      {victory && <h1>VICTORY!!!!</h1>}
      <h2>{stargazerCount ? `${stargazerCount} Stars` : "No Repo"}</h2>
      <div>{nameWithOwner}</div>
    </div>
  );
};
