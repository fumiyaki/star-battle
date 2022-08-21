import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { splitIntoRepositoryAndOwner } from "../../../src/components/models/repository";
import Battle from "../../../src/components/pages/Battle";
import {
  GetRepoDocument,
  GetRepoQuery,
  GetRepoQueryVariables,
} from "../../../src/generated/graphql";
import { fetchData } from "../../../src/graphql-codegen/customFetcher";

type Props = { isr: string };

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
    revalidate: 10800, // 3hour
  };
};

const Page: NextPage<Props> = ({ isr }) => {
  const router = useRouter();
  const { com1, com2 } = router.query;
  return (
    <>
      <Head>
        <title>
          Github Star Wars | {typeof com1 === "string" ? com1 : com1?.join(" ")}
          vs {typeof com2 === "string" ? com2 : com2?.join(" ")}
        </title>
        <meta name="description" content="Github Star Wars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Battle isr={isr} />
    </>
  );
};

export default Page;
