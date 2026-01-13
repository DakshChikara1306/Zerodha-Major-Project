import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

/**
 * Global dashboard context
 * - Trade modal handling
 * - Data refresh trigger
 */
const GeneralContext = React.createContext({
  openTradeWindow: () => {},
  closeTradeWindow: () => {},
  refreshFlag: 0,
  triggerRefresh: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isTradeWindowOpen, setIsTradeWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [tradeType, setTradeType] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  // Open BUY / SELL modal
  const openTradeWindow = (uid, type) => {
    setSelectedStockUID(uid);
    setTradeType(type);
    setIsTradeWindowOpen(true);
  };

  // Close modal & reset state
  const closeTradeWindow = () => {
    setIsTradeWindowOpen(false);
    setSelectedStockUID("");
    setTradeType(null);
  };

  // Trigger data refetch in dependent components
  const triggerRefresh = () => {
    setRefreshFlag((prev) => prev + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openTradeWindow,
        closeTradeWindow,
        refreshFlag,
        triggerRefresh,
      }}
    >
      {children}

      {/* Trade windows */}
      {isTradeWindowOpen && tradeType === "BUY" && (
        <BuyActionWindow uid={selectedStockUID} />
      )}

      {isTradeWindowOpen && tradeType === "SELL" && (
        <SellActionWindow uid={selectedStockUID} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
