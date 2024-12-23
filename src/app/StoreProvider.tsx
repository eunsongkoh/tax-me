"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./lib/store";
import { initializeItemCount } from "./lib/features/counter/counterSlice";
// import { NewItem } from "@/models/NewItem";
// import { initializeTotalItems } from "./lib/features/items/itemSlice";

export default function StoreProvider({
  itemCount = 0,
  children,
}: {
  itemCount?: number;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeItemCount(itemCount));
    // storeRef.current.dispatch(initializeTotalItems(items));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
