"use client";
import { useAppSelector } from "@/app/hooks";
import { Input } from "@nextui-org/react";
import BudgetProgress from "./BudgetProgress";
export default function UpdateBudget() {
  const userData = useAppSelector((state) => state.user);

  const changeBudget = () => {
    // make a call here for state change
    console.log("hi");
  };
  return (
    <>
      <p className="font-bold text-2xl pb-5">
        Welcome <span className="underline">{userData.userName}</span>
      </p>
      <p className="text-xl pt-2">Your Current Budget</p>
      {/* <p className="font-sm text-default-600">Change Budget</p> */}
      <BudgetProgress />
      <Input
        endContent={
          <div className="max-w-xs pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        label=""
        labelPlacement="outside"
        placeholder={userData.budget ? userData.budget : "0.00"}
        type="number"
        onChange={changeBudget}
        className="py-2"
      />
    </>
  );
}
