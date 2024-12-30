"use client";

import { useAppSelector } from "@/app/hooks";
import { Progress } from "@nextui-org/react";

export default function BudgetProgress() {
  const purchaseData: any[] = useAppSelector((state) => state.user.purchases);
  let budget = useAppSelector((state) => state.user.budget);
  const totalBudget = budget ? budget : 0;
  const total = purchaseData.reduce((accumulator, item) => {
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
