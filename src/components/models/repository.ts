const Delimiter = "----";

export const splitIntoRepositoryAndOwner = (
  nameWithOwnerReplaceSlashToHyphenHyphenHyphen: string | undefined
) => {
  const nameWithOwner =
    nameWithOwnerReplaceSlashToHyphenHyphenHyphen?.split(Delimiter);
  const [owner, repoName] =
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

export const injectHyphenIntoNameWithOwner = (nameWithOwner: string) =>
  nameWithOwner.replace("/", Delimiter).trim();
