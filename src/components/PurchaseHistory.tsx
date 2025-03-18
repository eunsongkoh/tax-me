"use client";
import { useAppSelector } from "@/app/hooks";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export default function PurchaseHistory() {
  const purchaseData: any[] = useAppSelector((state) => state.user.purchases);
  return (
    <>
      <p className="text-bold py-2 text-xl">Your Past Purchases</p>
      <Table aria-label="Past Purchase History">
        <TableHeader>
          <TableColumn>Purchase Id</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody items={purchaseData}>
          {(item) => (
            <TableRow key={item.purchaseId}>
              <TableCell>{item.purchaseId}</TableCell>
              <TableCell>${item.total.toFixed(2)}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
