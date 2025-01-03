"use client";
import AddItem from "@/components/AddItem";
import Chat from "@/components/Chat";
import CartBudget from "@/components/CartBudget";

import ReceiptList from "@/components/ReceiptList";

export default function Receipt() {
  return (
    <>
      <div className="h-screen container mx-auto px-3 flex flex-col">
        <CartBudget />
        <AddItem />
        <ReceiptList />
        <Chat />
      </div>
    </>
  );
}
