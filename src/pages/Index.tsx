import { useState } from "react";
import BirthdayInput from "@/components/BirthdayInput";
import LifeTimer from "@/components/LifeTimer";

const Index = () => {
  const [birthday, setBirthday] = useState<Date | null>(null);

  if (!birthday) {
    return <BirthdayInput onSubmit={setBirthday} />;
  }

  return <LifeTimer birthday={birthday} onReset={() => setBirthday(null)} />;
};

export default Index;
