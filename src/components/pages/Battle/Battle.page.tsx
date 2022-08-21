import { useRouter } from "next/router";
import { useGetRepoQuery } from "../../../generated/graphql";
import { splitIntoRepositoryAndOwner } from "../../models/repository";
import { BattleTemplate } from "./Battle.template";
type Props = {
  isr: string;
};
export const Battle = ({ isr }: Props) => {
  const router = useRouter();
  const { com1, com2 } = router.query;
  const { repoName, owner } = splitIntoRepositoryAndOwner(
    typeof com1 === "string" ? com1 : undefined
  );
  const { repoName: repoName2, owner: owner2 } = splitIntoRepositoryAndOwner(
    typeof com2 === "string" ? com2 : undefined
  );

  const { data, error, isLoading, isFetching } = useGetRepoQuery(
    { name: repoName, owner, name2: repoName2, owner2 },
    { initialData: JSON.parse(isr) }
  );

  if (error) {
    console.log(error);
    return <>error</>;
  }

  return <BattleTemplate data={data} isLoading={isLoading || isFetching} />;
};
