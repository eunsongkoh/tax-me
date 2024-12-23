"use client";
import { useAppSelector } from "@/app/hooks";

export default function ReceiptList() {
  const items = useAppSelector((state) => state.items.items);

  const renderedItems = items.map((item) => (
    <div className="columns-3" key={item.id}>
      <div>{item.obj_name}</div>
      <div>{item.quantity}</div>
      <div>${item.price * item.quantity}</div>
    </div>
  ));
  return (
    <>
      <div className="">{renderedItems}</div>
    </>
  );
}
