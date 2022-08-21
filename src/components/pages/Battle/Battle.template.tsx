import { GetRepoQuery } from "../../../generated/graphql";

type Props = {
  data: GetRepoQuery | undefined;
  isLoading: boolean;
};
export const BattleTemplate = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return <>loading</>;
  }
  if (data == null) {
    return <>no data</>;
  }
  return (
    <>
      <div>
        <div>{data?.com1?.nameWithOwner}</div>
        <div>{data?.com1?.stargazerCount}</div>
      </div>
      <div>
        <div>{data?.com2?.nameWithOwner}</div>
        <div>{data?.com2?.stargazerCount}</div>
      </div>
    </>
  );
};
