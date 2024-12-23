// import AddItem from "@/components/AddItem";
// import AddItemOptions from "@/components/AddItemOptions";

import ReceiptList from "@/components/ReceiptList";

export default function Receipt() {
  return (
    <>
      <div className="container mx-auto border-2">
        <button>Add New Item</button>
        <ReceiptList />
        <span>
          <h2>Total: {}</h2>
        </span>
      </div>
    </>
  );
}
