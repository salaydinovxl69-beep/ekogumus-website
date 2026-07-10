import React, { createContext, useCallback, useContext, useState } from "react";
import { PurchaseModal, type PurchaseItem } from "../components/PurchaseModal";

interface PurchaseContextType {
  openPurchase: (item?: PurchaseItem | null) => void;
  closePurchase: () => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; item: PurchaseItem | null }>({
    open: false,
    item: null,
  });

  const openPurchase = React.useCallback(
    (item: PurchaseItem | null = null) => setState({ open: true, item }),
    []
  );
  const closePurchase = React.useCallback(
    () => setState({ open: false, item: null }),
    []
  );

  return (
    <PurchaseContext.Provider value={{ openPurchase, closePurchase }}>
      {children}
      <PurchaseModal open={state.open} item={state.item} onClose={closePurchase} />
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  const ctx = useContext(PurchaseContext);
  if (!ctx) throw new Error("usePurchase must be used within a PurchaseProvider");
  return ctx;
}
