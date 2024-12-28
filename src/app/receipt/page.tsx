"use client";
import AddItem from "@/components/AddItem";
// import AddItemOptions from "@/components/AddItemOptions";

import ReceiptList from "@/components/ReceiptList";

export default function Receipt() {
  return (
    <>
      <div className="container mx-auto border-2">
        <AddItem />
        <ReceiptList />
      </div>
    </>
  );
}
