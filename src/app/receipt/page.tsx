"use client";
import AddItem from "@/components/AddItem";
import CartBudget from "@/components/CartBudget";
import Chat from "@/components/Chat";
import ReceiptList from "@/components/ReceiptList";

export default function Receipt() {
  return (
    <>
      <div className="h-screen container mx-auto px-5 flex flex-col">
        <CartBudget />
        <AddItem />
        <ReceiptList />
        <Chat />
      </div>
    </>
  );
}
