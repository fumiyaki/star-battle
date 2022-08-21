import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { injectHyphenIntoNameWithOwner } from "../../models/repository";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

type Props = {
  com1: string;
  com2: string;
  setCom1: (value: string) => void;
  setCom2: (value: string) => void;
};

export const TopTemplate = ({ com1, com2, setCom1, setCom2 }: Props) => {
  const router = useRouter();
  const nameWithOwnerReplaceSlashToHyphenHyphenHyphen1 =
    injectHyphenIntoNameWithOwner(com1);
  const nameWithOwnerReplaceSlashToHyphenHyphenHyphen2 =
    injectHyphenIntoNameWithOwner(com2);
  return (
    <main
      css={css`
        width: 100%;
        min-height: 100vh;
        background-color: #192638;
        color: #fff;
        text-align: center;
      `}
    >
      <h1
        css={css`
          padding-top: 128px;
        `}
      >
        Star Battle
      </h1>
      <p
        css={css`
          margin-top: 16px;
        `}
      >
        2つのGithubリポジトリのスター数を比べてみよう
      </p>
      <div
        css={css`
          margin-top: 64px;
          display: flex;
          justify-content: space-around;
        `}
      >
        <div
          css={css`
            width: 40%;
          `}
        >
          <Input
            id="repo1"
            value={com1}
            onChangeHandler={setCom1}
            label="1つ目のリポジトリ"
            placeholder="facebook/react"
          />
        </div>
        <div
          css={css`
            width: 40%;
            margin-left: 16px;
          `}
        >
          <Input
            id="repo2"
            value={com2}
            onChangeHandler={setCom2}
            label="2つ目のリポジトリ"
            placeholder="vuejs/vue"
          />
        </div>
      </div>
      <Button
        label="Battle!"
        onClickHandler={() => {
          router.push(
            `battle/${nameWithOwnerReplaceSlashToHyphenHyphenHyphen1}/${nameWithOwnerReplaceSlashToHyphenHyphenHyphen2}`
          );
        }}
        disabled={
          nameWithOwnerReplaceSlashToHyphenHyphenHyphen1 === "" ||
          nameWithOwnerReplaceSlashToHyphenHyphenHyphen2 === ""
        }
      />
    </main>
  );
};
