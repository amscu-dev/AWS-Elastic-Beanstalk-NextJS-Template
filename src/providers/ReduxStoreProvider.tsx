"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function StoreContextProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreContextProvider;
