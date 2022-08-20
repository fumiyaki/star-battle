import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import {
  GetRepoDocument,
  GetRepoQuery,
  GetRepoQueryVariables,
  useGetRepoQuery,
} from "../../../src/generated/graphql";
import { fetchData } from "../../../src/graphql-codegen/customFetcher";

type Props = { isr: string };

const splitIntoRepositoryAndOwner = (
  nameWithOwnerReplaceSlashToHyphenHyphenHyphen: string | undefined
) => {
  const nameWithOwner =
    nameWithOwnerReplaceSlashToHyphenHyphenHyphen?.split("----");
  const [repoName, owner] =
    nameWithOwner?.length === 2 ? nameWithOwner : ["", ""];
  console.log({
    repoName,
    owner,
  });

  return {
    repoName,
    owner,
  };
};

interface Params extends ParsedUrlQuery {
  com1: string;
  com2: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  console.log({ para321ms: params });

  const { repoName, owner } = splitIntoRepositoryAndOwner(params?.com1);
  const { repoName: repoName2, owner: owner2 } = splitIntoRepositoryAndOwner(
    params?.com2
  );

  const repoBattle = await fetchData<GetRepoQuery, GetRepoQueryVariables>(
    GetRepoDocument,
    { name: repoName, owner, name2: repoName2, owner2 }
  )().catch((e) => {
    console.log(e);
    return { name: "", owner: "", name2: "", owner2: "" };
  });

  return {
    props: { isr: JSON.stringify(repoBattle) },
    revalidate: 86400, // 1day
  };
};

const Page: NextPage<Props> = ({ isr }) => {
  const router = useRouter();
  const { com1, com2 } = router.query;
  const { repoName, owner } = splitIntoRepositoryAndOwner(
    typeof com1 === "string" ? com1 : ""
  );
  const { repoName: repoName2, owner: owner2 } = splitIntoRepositoryAndOwner(
    typeof com2 === "string" ? com2 : ""
  );

  const { data, error, isLoading, isFetching } = useGetRepoQuery(
    { name: repoName, owner, name2: repoName2, owner2 },
    { initialData: JSON.parse(isr) }
  );

  if (error) {
    console.log(error);
    return <>error</>;
  }
  if (isLoading || isFetching) {
    return <>loading</>;
  }
  return (
    <div>
      <div>
        <div>{data?.com1?.nameWithOwner}</div>
        <div>{data?.com1?.stargazerCount}</div>
      </div>
      <div>
        <div>{data?.com2?.nameWithOwner}</div>
        <div>{data?.com2?.stargazerCount}</div>
      </div>
    </div>
  );
};

export default Page;
