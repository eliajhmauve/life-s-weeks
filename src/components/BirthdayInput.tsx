import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRandomQuote } from "@/data/quotes";

interface BirthdayInputProps {
  onSubmit: (birthday: Date) => void;
}

const BirthdayInput = ({ onSubmit }: BirthdayInputProps) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const quote = getRandomQuote();

  const handleSubmit = () => {
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (!isNaN(date.getTime()) && date < new Date()) {
      onSubmit(date);
    }
  };

  const isValid =
    year.length === 4 &&
    parseInt(month) >= 1 && parseInt(month) <= 12 &&
    parseInt(day) >= 1 && parseInt(day) <= 31;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="animate-fade-in-up max-w-md w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            人生倒數計時器
          </h1>
          <p className="text-muted-foreground text-lg">
            視覺化你的生命，珍惜每一刻
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">請輸入你的生日</p>
          <div className="flex gap-3 justify-center">
            <Input
              type="number"
              placeholder="年 (YYYY)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-28 text-center"
              min="1900"
              max={new Date().getFullYear()}
            />
            <Input
              type="number"
              placeholder="月"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-20 text-center"
              min="1"
              max="12"
            />
            <Input
              type="number"
              placeholder="日"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-20 text-center"
              min="1"
              max="31"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full max-w-xs"
            size="lg"
          >
            開始探索
          </Button>
        </div>

        <div className="pt-8 border-t border-border">
          <blockquote className="font-serif text-muted-foreground italic text-sm leading-relaxed">
            「{quote.text}」
          </blockquote>
          <p className="text-xs text-muted-foreground mt-2">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayInput;
