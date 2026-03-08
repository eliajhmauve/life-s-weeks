import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { getRandomQuote } from "@/data/quotes";
import LifeGridView from "./LifeGridView";
import ProgressView from "./ProgressView";
import MilestoneView from "./MilestoneView";
import { Grid3X3, BarChart3, Flag, RotateCcw } from "lucide-react";

type ViewType = "grid" | "progress" | "milestone";

interface LifeTimerProps {
  birthday: Date;
  onReset: () => void;
}

const LifeTimer = ({ birthday, onReset }: LifeTimerProps) => {
  const [view, setView] = useState<ViewType>("grid");
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const quote = useMemo(() => getRandomQuote(), []);

  const views: { key: ViewType; label: string; icon: React.ReactNode }[] = [
    { key: "grid", label: "週格子", icon: <Grid3X3 className="w-4 h-4" /> },
    { key: "progress", label: "進度條", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "milestone", label: "里程碑", icon: <Flag className="w-4 h-4" /> },
  ];

  const lifePercent = useMemo(() => {
    const totalMs = lifeExpectancy * 365.25 * 24 * 60 * 60 * 1000;
    const livedMs = new Date().getTime() - birthday.getTime();
    return Math.min((livedMs / totalMs) * 100, 100);
  }, [birthday, lifeExpectancy]);

  const shareText = `我的人生已經過了 ${lifePercent.toFixed(1)}%，你呢？\n\n#人生倒數計時器`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ text: shareText });
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("已複製到剪貼簿！");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onReset} className="text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
          <h1 className="text-sm font-medium font-serif">人生倒數計時器</h1>
          <Button variant="ghost" size="sm" onClick={handleShare} className="text-xs">
            分享
          </Button>
        </div>
      </header>

      {/* Tagline */}
      <div className="text-center py-6 px-4">
        <p className="text-lg font-serif text-foreground/80">
          今天是你剩餘人生的第一天
        </p>
      </div>

      {/* View Tabs */}
      <div className="flex justify-center gap-1 px-4 pb-6">
        {views.map((v) => (
          <button
            key={v.key}
            onClick={() => setView(v.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all ${
              view === v.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {v.icon}
            {v.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 px-4 pb-8 max-w-4xl mx-auto w-full">
        {view === "grid" && (
          <LifeGridView birthday={birthday} lifeExpectancy={lifeExpectancy} />
        )}
        {view === "progress" && (
          <ProgressView birthday={birthday} lifeExpectancy={lifeExpectancy} />
        )}
        {view === "milestone" && (
          <MilestoneView birthday={birthday} lifeExpectancy={lifeExpectancy} />
        )}
      </main>

      {/* Life Expectancy Slider */}
      <div className="border-t border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-6 py-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>預期壽命</span>
            <span className="font-medium text-foreground">{lifeExpectancy} 歲</span>
          </div>
          <Slider
            value={[lifeExpectancy]}
            onValueChange={([v]) => setLifeExpectancy(v)}
            min={60}
            max={100}
            step={1}
          />
        </div>
      </div>

      {/* Footer Quote */}
      <footer className="border-t border-border py-6 px-6 text-center">
        <blockquote className="font-serif text-xs text-muted-foreground italic">
          「{quote.text}」— {quote.author}
        </blockquote>
        <p className="mt-3 text-xs font-medium text-primary">最好的時間是現在</p>
      </footer>
    </div>
  );
};

export default LifeTimer;
