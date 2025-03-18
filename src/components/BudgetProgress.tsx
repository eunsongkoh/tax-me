"use client";

import { useAppSelector } from "@/app/hooks";
import { Progress } from "@heroui/react";

export default function BudgetProgress() {
  const purchaseData: any[] = useAppSelector((state) => state.user.purchases);
  const budget = useAppSelector((state) => state.user.budget);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const currentMonthPurchases = purchaseData.filter((item) => {
    const [year, month] = item.date.split("-");

    return parseInt(month) === currentMonth && parseInt(year) === currentYear;
  });

  const totalBudget = budget ? budget : 0;
  const total = currentMonthPurchases.reduce((accumulator, item) => {
    return accumulator + item.total;
  }, 0);

  return (
    <>
      <Progress
        classNames={{
          base: "max-w-md",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-green-500 to-pink-500",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        formatOptions={{ style: "currency", currency: "CAD" }}
        label={total > totalBudget ? `Over Budget` : `Under Budget`}
        maxValue={totalBudget}
        showValueLabel={true}
        size="sm"
        value={total}
      />
    </>
  );
}
