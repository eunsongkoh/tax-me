"use client";
import { useAppSelector } from "@/app/hooks";
import { Button } from "@nextui-org/button";

export default function ReceiptList() {
  const items = useAppSelector((state) => state.items.items);

  const total = items.reduce((accumulator, item) => {
    const taxMultiplier = item.taxRate / 100;
    const itemTotal = (item.price + item.price * taxMultiplier) * item.quantity;
    return accumulator + itemTotal;
  }, 0);

  const renderedItems = items.map((item) => {
    const taxMultiplier = item.taxRate / 100;
    const itemTotal = (item.price + item.price * taxMultiplier) * item.quantity;

    return (
      <div className="columns-3" key={item.id}>
        <div>{item.obj_name}</div>
        <div>{item.quantity}</div>
        <div>${itemTotal.toFixed(2)}</div>
      </div>
    );
  });

  return (
    <>
      <div className="columns-3">
        <h1>Item Name</h1>
        <h1>Quantity</h1>
        <h1>Price</h1>
      </div>
      <div className="">{renderedItems}</div>
      <div>Total: ${total.toFixed(2)}</div>
      <Button>Checkout</Button>
    </>
  );
}
