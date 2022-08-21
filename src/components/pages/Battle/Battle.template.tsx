import { css } from "@emotion/react";
import { GetRepoQuery } from "../../../generated/graphql";
import { BattleResult } from "../../ui/BattleResult";

type Props = {
  data: GetRepoQuery | undefined;
  isLoading: boolean;
};

const centerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1ch;
`;

export const BattleTemplate = ({ data, isLoading }: Props) => {
  console.log({ data, isLoading });

  if (isLoading) {
    return <>loading</>;
  }
  if (data == null) {
    return <>no data</>;
  }
  return (
    <main
      css={css`
        width: 100%;
        min-height: 100vh;
        display: flex;
      `}
    >
      <BattleResult
        nameWithOwner={data?.com1?.nameWithOwner ?? null}
        stargazerCount={data?.com1?.stargazerCount ?? null}
        color="white"
        victory={
          (data?.com1?.stargazerCount ?? 0) > (data?.com2?.stargazerCount ?? 0)
        }
      />
      <BattleResult
        nameWithOwner={data?.com2?.nameWithOwner ?? null}
        stargazerCount={data?.com2?.stargazerCount ?? null}
        color="black"
        victory={
          (data?.com2?.stargazerCount ?? 0) > (data?.com1?.stargazerCount ?? 0)
        }
      />
    </main>
  );
};
