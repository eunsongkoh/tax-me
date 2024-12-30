"use client";
import AddItem from "@/components/AddItem";
// import AddItemOptions from "@/components/AddItemOptions";

import ReceiptList from "@/components/ReceiptList";

export default function Receipt() {
  return (
    <>
      <div className="h-screen container mx-auto px-3 flex flex-col">
        <AddItem />
        <ReceiptList />
      </div>
    </>
  );
}
