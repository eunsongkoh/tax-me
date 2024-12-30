"use client";
import { useAppSelector } from "@/app/hooks";
import {
  useClearItems,
  useModifyQuant,
  useRemoveItem,
} from "@/utils/ModifyItems";
import { Button } from "@nextui-org/button";

export default function ReceiptList() {
  const { clearAllItems } = useClearItems();
  const { removeCurrentItem } = useRemoveItem();
  const { incQuant, decQuant } = useModifyQuant();
  const items = useAppSelector((state) => state.items.items);
  const userId = useAppSelector((state) => state.user.userId);
  const userData = useAppSelector((state) => state.user);
  console.log(userData);

  const total = items.reduce((accumulator, item) => {
    const taxMultiplier = item.taxRate / 100;
    const itemTotal = (item.price + item.price * taxMultiplier) * item.quantity;
    return accumulator + itemTotal;
  }, 0);

  const renderedItems = items.map((item) => {
    const taxMultiplier = item.taxRate / 100;
    const itemTotal = (item.price + item.price * taxMultiplier) * item.quantity;

    return (
      <div className="columns-4" key={item.id}>
        <div>{item.obj_name}</div>
        <div className="flex items-center justify-center">
          <Button
            onPress={() => {
              decQuant(item.id);
            }}
            variant="light"
          >
            -
          </Button>
          <div>{item.quantity}</div>
          <Button
            onPress={() => {
              incQuant(item.id);
            }}
            variant="light"
          >
            +
          </Button>
        </div>
        <div>${itemTotal.toFixed(2)}</div>
        <Button
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

      console.log("Making a Call to the Checkout API", checkoutRq);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutRq),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        // clear the cart
        clearAllItems();
      } else {
        const error = await response.json();
        console.log(error.errorMessage || "Failed Creating a New Purchase");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <div className="columns-4">
        <h1>Item Name</h1>
        <h1>Quantity</h1>
        <h1>Price</h1>
      </div>
      <div className="">{renderedItems}</div>
      <div>Total: ${total.toFixed(2)}</div>
      <Button onPress={checkout}>Checkout</Button>
    </>
  );
}
