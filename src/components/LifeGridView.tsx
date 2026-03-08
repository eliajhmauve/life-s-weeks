import { useMemo } from "react";

interface LifeGridViewProps {
  birthday: Date;
  lifeExpectancy: number;
}

const LifeGridView = ({ birthday, lifeExpectancy }: LifeGridViewProps) => {
  const { totalWeeks, pastWeeks } = useMemo(() => {
    const total = lifeExpectancy * 52;
    const now = new Date();
    const diffMs = now.getTime() - birthday.getTime();
    const past = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
    return { totalWeeks: total, pastWeeks: Math.min(past, total) };
  }, [birthday, lifeExpectancy]);

  // Render in rows of 52 (one year per row)
  const years = lifeExpectancy;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold font-serif">你的人生週格子圖</h2>
        <p className="text-sm text-muted-foreground">
          每個方格代表一週 · 共 {totalWeeks.toLocaleString()} 週 · 已過{" "}
          <span className="text-life-past font-medium">{pastWeeks.toLocaleString()}</span> 週
        </p>
      </div>

      <div className="flex justify-center">
        <div className="overflow-x-auto max-w-full px-2">
          <div className="inline-grid gap-[2px]" style={{ gridTemplateColumns: `repeat(52, 1fr)` }}>
            {Array.from({ length: totalWeeks }, (_, i) => {
              const isPast = i < pastWeeks;
              const isCurrent = i === pastWeeks;
              return (
                <div
                  key={i}
                  className={`life-grid-cell ${
                    isCurrent
                      ? "life-grid-cell-current"
                      : isPast
                      ? "life-grid-cell-past"
                      : "life-grid-cell-future"
                  }`}
                  title={`第 ${Math.floor(i / 52) + 1} 年，第 ${(i % 52) + 1} 週`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-life-past" />
          <span>已過</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-life-current animate-pulse" />
          <span>這週</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-life-future" />
          <span>未來</span>
        </div>
      </div>

      {/* Year labels on the left */}
      <p className="text-center text-xs text-muted-foreground">
        ↑ 每行 = 一年（52 週）· 共 {years} 行
      </p>
    </div>
  );
};

export default LifeGridView;
