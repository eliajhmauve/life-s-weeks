import { useMemo } from "react";

interface MilestoneViewProps {
  birthday: Date;
  lifeExpectancy: number;
}

const MilestoneView = ({ birthday, lifeExpectancy }: MilestoneViewProps) => {
  const milestones = useMemo(() => {
    const now = new Date();
    const items: { icon: string; label: string; daysLeft: number }[] = [];

    // Next birthday
    const nextBirthday = new Date(
      now.getFullYear(),
      birthday.getMonth(),
      birthday.getDate()
    );
    if (nextBirthday <= now) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysToBirthday = Math.ceil(
      (nextBirthday.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
    );
    items.push({ icon: "🎂", label: "下一個生日", daysLeft: daysToBirthday });

    // Age milestones
    const currentAge = Math.floor(
      (now.getTime() - birthday.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );
    const ageMilestones = [30, 40, 50, 60, 70, 80, 90, 100];
    for (const age of ageMilestones) {
      if (age > currentAge && age <= lifeExpectancy) {
        const milestoneDate = new Date(birthday);
        milestoneDate.setFullYear(milestoneDate.getFullYear() + age);
        const days = Math.ceil(
          (milestoneDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
        );
        if (days > 0) {
          const icons: Record<number, string> = {
            30: "🎓", 40: "🏠", 50: "⭐", 60: "🌅",
            70: "🌿", 80: "🎉", 90: "💎", 100: "👑",
          };
          items.push({
            icon: icons[age] || "📅",
            label: `${age} 歲`,
            daysLeft: days,
          });
        }
      }
    }

    // 10000 day milestones
    const daysSinceBirth = Math.floor(
      (now.getTime() - birthday.getTime()) / (24 * 60 * 60 * 1000)
    );
    const nextThousand = Math.ceil(daysSinceBirth / 10000) * 10000;
    if (nextThousand > daysSinceBirth) {
      items.push({
        icon: "🔢",
        label: `人生第 ${nextThousand.toLocaleString()} 天`,
        daysLeft: nextThousand - daysSinceBirth,
      });
    }

    // New year
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);
    const daysToNewYear = Math.ceil(
      (nextYear.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
    );
    items.push({
      icon: "📅",
      label: `${now.getFullYear() + 1} 年`,
      daysLeft: daysToNewYear,
    });

    return items;
  }, [birthday, lifeExpectancy]);

  const formatDays = (days: number) => {
    if (days >= 365) {
      const years = Math.floor(days / 365);
      const remaining = days % 365;
      return `${years} 年 ${remaining} 天`;
    }
    return `${days} 天`;
  };

  return (
    <div className="space-y-8 animate-fade-in-up max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold font-serif">重要里程碑倒數</h2>
        <p className="text-sm text-muted-foreground">每一天都在靠近</p>
      </div>

      <div className="space-y-3">
        {milestones.map((m, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl bg-card p-4 border border-border"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{m.icon}</span>
              <span className="font-medium text-sm">距離 {m.label}</span>
            </div>
            <span className="font-serif font-semibold text-primary">
              {formatDays(m.daysLeft)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneView;
