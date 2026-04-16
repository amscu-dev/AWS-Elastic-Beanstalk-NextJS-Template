"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";

import { store } from "@/store/store";

interface Props {
  children: ReactNode;
}

function StoreContextProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreContextProvider;
