import AddItem from "@/components/AddItem";

export default function Receipt() {
  return (
    <>
      <div className="container mx-auto border-2">
        <button>Add New Item</button>
        <span>
          <h2>Total: {}</h2>
        </span>
      </div>
      <AddItem />
    </>
  );
}
