"use client";
import { useAppSelector } from "@/app/hooks";
import { Input } from "@heroui/react";
import BudgetProgress from "./BudgetProgress";
import { useUpdateBudget } from "@/utils/updateBudget";
import { useState } from "react";
export default function UpdateBudget() {
  const userData = useAppSelector((state) => state.user);
  const { updBudget } = useUpdateBudget();
  const [currBudgetVal, setCurrBudgetVal] = useState(userData.budget || 0.0);

  const valChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrBudgetVal(parseFloat(e.target.value));
  };

  const changeBudget = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // make a call here for state change
    if (parseFloat(e.target.value) == userData.budget) {
      return;
    }
    setCurrBudgetVal(parseFloat(e.target.value));
    try {
      const body = {
        userId: userData.userId,
        budget: currBudgetVal,
      };

      const response = await fetch("/api/budget", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        updBudget(currBudgetVal);
      } else {
        const error = await response.json();
        console.error(error.errorMessage || "Failed Creating a New Purchase");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <p className="font-bold text-2xl pb-5">
        Welcome <span className="underline">{userData.userName}</span>
      </p>
      <p className="text-xl pt-2">Your Budget this Month</p>
      <BudgetProgress />
      <Input
        endContent={
          <div className="max-w-xs pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        label=""
        labelPlacement="outside"
        placeholder={userData.budget ? userData.budget.toString() : "0.00"}
        type="number"
        onChange={valChange}
        onBlur={changeBudget}
        value={currBudgetVal.toString()}
        className="py-2"
      />
    </>
  );
}
