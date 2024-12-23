export default function ReceiptItem(
  itemName: string,
  quantity: number,
  price: number
) {
  return (
    <>
      <div className="columns-3">
        <div>{itemName}</div>
        <div>{quantity}</div>
        <div>${price}</div>
      </div>
    </>
  );
}
