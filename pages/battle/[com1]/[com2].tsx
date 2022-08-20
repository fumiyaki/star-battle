import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useGetStarQuery } from "../../../src/generated/graphql";

type Props = {
  com1: GitHubStar;
  com2: GitHubStar;
};

interface Params extends ParsedUrlQuery {
  nameWithOwnerReplaceSlashToHyphenHyphenHyphen1: string;
  nameWithOwnerReplaceSlashToHyphenHyphenHyphen2: string;
}

type GitHubStar = {
  nameWithOwner: string;
  star: number;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  let repositoryName1 = "";
  let repositoryName2 = "";
  if (params?.nameWithOwnerReplaceSlashToHyphenHyphenHyphen1) {
    repositoryName1 =
      params.nameWithOwnerReplaceSlashToHyphenHyphenHyphen1.replace(
        "----",
        "/"
      );
  }
  if (params?.nameWithOwnerReplaceSlashToHyphenHyphenHyphen2) {
    repositoryName2 =
      params.nameWithOwnerReplaceSlashToHyphenHyphenHyphen2.replace(
        "----",
        "/"
      );
  }

  const com1: GitHubStar = await getItem(repositoryName1);
  const com2: GitHubStar = await getItem(repositoryName2);

  return {
    props: {
      com1,
      com2,
    },
    revalidate: 86400, // 1day
  };
};

const Page: NextPage<Props> = ({ com1, com2 }) => {
  const { data } = useGetStarQuery(undefined);
  console.log({ data });

  return <div>aaa</div>;
};

export default Page;
