"use client";
import PurchaseHistory from "@/components/PurchaseHistory";
import UpdateBudget from "@/components/UpdateBudget";
import BudgetProgress from "@/components/BudgetProgress";

export default function Dashboard() {
  return (
    <div className="h-screen container mx-auto p-7 flex flex-col gap-y-5">
      <UpdateBudget />
      <PurchaseHistory />
    </div>
  );
}
