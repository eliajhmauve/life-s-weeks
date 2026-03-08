import { useState } from "react";
import BirthdayInput from "@/components/BirthdayInput";
import LifeTimer from "@/components/LifeTimer";

const STORAGE_KEY = "life-timer-birthday";

const loadBirthday = (): Date | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const date = new Date(stored);
      if (!isNaN(date.getTime())) return date;
    }
  } catch {}
  return null;
};

const Index = () => {
  const [birthday, setBirthday] = useState<Date | null>(loadBirthday);

  const handleSubmit = (date: Date) => {
    localStorage.setItem(STORAGE_KEY, date.toISOString());
    setBirthday(date);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setBirthday(null);
  };

  if (!birthday) {
    return <BirthdayInput onSubmit={handleSubmit} />;
  }

  return <LifeTimer birthday={birthday} onReset={handleReset} />;
};

export default Index;
