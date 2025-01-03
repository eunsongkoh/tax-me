import { Input, Progress } from "@nextui-org/react";
import { useAppSelector } from "@/app/hooks";
import { useUpdateSessionBudget } from "@/utils/updateBudget";
import { useState } from "react";

export default function CartBudget() {
  const currBudget = useAppSelector(
    (state) => state.sessionBudget.sessionBudget
  );
  const items = useAppSelector((state) => state.items.items);
  const total = items.reduce((accumulator, item) => {
    const taxMultiplier = item.taxRate / 100;
    const itemTotal = (item.price + item.price * taxMultiplier) * item.quantity;
    return accumulator + itemTotal;
  }, 0);
  const { updSessionBudget } = useUpdateSessionBudget();
  const [localBudget, setLocalBudget] = useState<string>(
    currBudget ? currBudget.toString() : "0.00"
  );

  const valChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalBudget(e.target.value);
  };

  const handleBlur = () => {
    if (localBudget) {
      updSessionBudget(parseFloat(localBudget));
      setLocalBudget(localBudget.toString());
    }
  };

  return (
    <>
      <div className="flex flex-col p-1 mb-3">
        <Progress
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-green-500 to-red-700",
            label: "tracking-wider font-medium text-default-600 text-right",
            value: "text-foreground/60",
          }}
          formatOptions={{ style: "currency", currency: "CAD" }}
          label={`$${total.toFixed(2)} / $${currBudget.toFixed(2)}`}
          maxValue={currBudget}
          showValueLabel={false}
          size="sm"
          value={total}
        />
        <Input
          endContent={
            <div className="max-w-xs pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          label="Change Your Budget:"
          labelPlacement="inside"
          placeholder={"0.00"}
          type="number"
          onBlur={handleBlur}
          onChange={valChange}
          value={localBudget}
          className="py-3"
        />
      </div>
    </>
  );
}
