"use client";
import { Provider } from "react-redux";
import { store } from "@/app/stateManager/stores/store"; // Adjust the path as needed

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
