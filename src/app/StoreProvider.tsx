"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, persistor } from "./lib/store";
import { initializeItemCount } from "./lib/features/counter/counterSlice";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const store = makeStore();
persistStore(store);

export default function StoreProvider({
  itemCount = 0,
  children,
}: {
  itemCount?: number;
  children: React.ReactNode;
}) {
  const [initialized, setInitialized] = useState(false);

  // init store once after first render
  useEffect(() => {
    store.dispatch(initializeItemCount(itemCount));
    setInitialized(true);
  }, [itemCount]);

  // add a wait here later for when the store isnt initialized
  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
