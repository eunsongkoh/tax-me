"use client";
import { useAppSelector } from "../hooks";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function Dashboard() {
  const userData = useAppSelector((state) => state.user);
  const purchaseData: any[] = useAppSelector((state) => state.user.purchases);

  return (
    <>
      <h1>Welcome {userData.userName}</h1>
      <Table aria-label="Past Purchase History">
        <TableHeader>
          <TableColumn>Purchase Id</TableColumn>
          <TableColumn>Total</TableColumn>
        </TableHeader>
        <TableBody items={purchaseData}>
          {(item) => (
            <TableRow key={item.purchaseId}>
              <TableCell>{item.purchaseId}</TableCell>
              <TableCell>${item.total}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
