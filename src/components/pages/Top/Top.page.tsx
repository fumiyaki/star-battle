import { useState } from "react";
import { TopTemplate } from "./Top.template";

export const Top = () => {
  const [com1, setCom1] = useState("");
  const [com2, setCom2] = useState("");

  const handleSetCom1 = (value: string) => setCom1(value);
  const handleSetCom2 = (value: string) => setCom2(value);
  return (
    <TopTemplate
      com1={com1}
      com2={com2}
      setCom1={handleSetCom1}
      setCom2={handleSetCom2}
    />
  );
};
