import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserCart from "./pages/UserCart";
import GuestCart from "./pages/GuestCart";

const router = createBrowserRouter({
  Home: { path: "/", element: <Home /> },
  Dashboard: { path: "/dashboard", element: <Dashboard /> },
  UserCart: { path: "/user-cart/{id}", element: <UserCart /> },
  GuestCart: { path: "/guest-cart", element: <GuestCart /> },
});

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
