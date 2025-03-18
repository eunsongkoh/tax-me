"use client";
import { useAppSelector } from "@/app/hooks";
import {
  useClearItems,
  useModifyQuant,
  useRemoveItem,
} from "@/utils/modifyItems";

import { useUpdatePurchases } from "@/utils/purchases";
import { Button } from "@heroui/button";

export default function ReceiptList() {
  const { clearAllItems } = useClearItems();
  const { removeCurrentItem } = useRemoveItem();
  const { incQuant, decQuant } = useModifyQuant();
  const { updPurchases } = useUpdatePurchases();
  const items = useAppSelector((state) => state.items.items);
  const userId = useAppSelector((state) => state.user.userId);
  const userData = useAppSelector((state) => state.user);

  const total = items.reduce((accumulator, item) => {
    const taxMultiplier = item.taxRate / 100;
    const itemTotal = (item.price + item.price * taxMultiplier) * item.quantity;
    return accumulator + itemTotal;
  }, 0);

  const renderedItems = items.map((item) => {
    const taxMultiplier = item.taxRate / 100;
    const itemTotal = (item.price + item.price * taxMultiplier) * item.quantity;

    return (
      <div className="grid grid-cols-5 justify-stretch my-2" key={item.id}>
        <div className="flex items-center">
          <p>{item.obj_name}</p>
        </div>
        <div className="flex items-center col-span-2">
          <Button
            size="sm"
            onPress={() => {
              decQuant(item.id);
            }}
            variant="light"
            color="danger"
          >
            -
          </Button>
          <div>{item.quantity}</div>
          <Button
            size="sm"
            onPress={() => {
              incQuant(item.id);
            }}
            variant="light"
            color="success"
          >
            +
          </Button>
        </div>
        <div className="flex items-center">
          <p>${itemTotal.toFixed(2)}</p>
        </div>
        <Button
          size="sm"
          onPress={() => {
            removeCurrentItem(item.id);
          }}
        >
          Delete
        </Button>
      </div>
    );
  });

  const totalItems: { price: string; itemName: string }[] = [];
  const checkout = async () => {
    if (userId == null) return;
    // need to collect all the items and put them all together
    for (const item of items) {
      const tempItem = {
        price: item.price.toFixed(2),
        itemName: item.obj_name,
        quantity: item.quantity,
      };

      totalItems.push(tempItem);
    }

    // make a call to the checkout api
    try {
      const checkoutRq = {
        userId: userId,
        items: totalItems,
        total: parseFloat(total.toFixed(2)),
      };


      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutRq),
      });

      if (response.ok) {
        const result = await response.json();

        // clear the cart
        updPurchases(result.data.purchases);
        clearAllItems();
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
      <div className="flex flex-col h-full mt-2">
        <div className="grid grid-cols-5 justify-evenly">
          <p className="font-bold">Item</p>
          <p className="col-span-2 text-center font-bold">Quantity</p>
          <p className="text-left font-bold">Price</p>
        </div>
        <div>{renderedItems}</div>
      </div>
      <div className="flex flex-col items-end mt-auto mb-5">
        <div className="text-right mb-1">
          <p className="text-lg">Total: ${total.toFixed(2)}</p>
        </div>
        {userId && (
          <Button
            onPress={checkout}
            className="transition-transform bg-gradient-to-r from-green-500 to-green-900"
            variant="shadow"
          >
            Checkout
          </Button>
        )}
      </div>
    </>
  );
}
