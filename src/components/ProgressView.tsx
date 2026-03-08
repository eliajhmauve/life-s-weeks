import { useMemo } from "react";

interface ProgressViewProps {
  birthday: Date;
  lifeExpectancy: number;
}

const ProgressView = ({ birthday, lifeExpectancy }: ProgressViewProps) => {
  const stats = useMemo(() => {
    const now = new Date();
    const totalLifeMs = lifeExpectancy * 365.25 * 24 * 60 * 60 * 1000;
    const livedMs = now.getTime() - birthday.getTime();
    const lifePercent = Math.min((livedMs / totalLifeMs) * 100, 100);

    const livedDays = Math.floor(livedMs / (24 * 60 * 60 * 1000));
    const livedYears = Math.floor(livedDays / 365.25);
    const livedMonths = Math.floor((livedDays % 365.25) / 30.44);
    const livedRemainingDays = Math.floor(livedDays % 30.44);

    const remainingMs = totalLifeMs - livedMs;
    const remainingDays = Math.max(0, Math.floor(remainingMs / (24 * 60 * 60 * 1000)));
    const remainingYears = Math.floor(remainingDays / 365.25);
    const remainingMonths = Math.floor((remainingDays % 365.25) / 30.44);
    const remainingRemainingDays = Math.floor(remainingDays % 30.44);

    // Year progress
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    const yearPercent =
      ((now.getTime() - startOfYear.getTime()) /
        (endOfYear.getTime() - startOfYear.getTime())) *
      100;

    // Today progress
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayPercent =
      ((now.getTime() - startOfDay.getTime()) / (24 * 60 * 60 * 1000)) * 100;

    return {
      lifePercent,
      livedYears,
      livedMonths,
      livedRemainingDays,
      remainingYears,
      remainingMonths,
      remainingRemainingDays,
      yearPercent,
      dayPercent,
    };
  }, [birthday, lifeExpectancy]);

  return (
    <div className="space-y-10 animate-fade-in-up max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold font-serif">人生進度</h2>
        <p className="text-muted-foreground text-sm">以 {lifeExpectancy} 歲為預期壽命</p>
      </div>

      <ProgressSection
        label="人生進度"
        percent={stats.lifePercent}
        detail={
          <>
            <span>已過：{stats.livedYears} 年 {stats.livedMonths} 個月 {stats.livedRemainingDays} 天</span>
            <span>剩餘：{stats.remainingYears} 年 {stats.remainingMonths} 個月 {stats.remainingRemainingDays} 天</span>
          </>
        }
      />

      <ProgressSection
        label="今年進度"
        percent={stats.yearPercent}
        detail={<span>{new Date().getFullYear()} 年已過 {stats.yearPercent.toFixed(1)}%</span>}
      />

      <ProgressSection
        label="今日進度"
        percent={stats.dayPercent}
        detail={<span>今天已過 {stats.dayPercent.toFixed(1)}%</span>}
      />
    </div>
  );
};

function ProgressSection({
  label,
  percent,
  detail,
}: {
  label: string;
  percent: number;
  detail: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-2xl font-serif font-semibold">
          {percent.toFixed(1)}%
        </span>
      </div>
      <div className="h-3 rounded-full bg-life-future overflow-hidden">
        <div
          className="h-full rounded-full progress-bar-fill transition-all duration-1000"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
        {detail}
      </div>
    </div>
  );
}

export default ProgressView;
