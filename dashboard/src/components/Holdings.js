import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { refreshFlag } = useContext(GeneralContext);

  // Fetch holdings from backend
  const fetchHoldings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/allHoldings");
      setHoldings(res.data || []);
    } catch (err) {
      console.error("Failed to fetch holdings", err);
      setHoldings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, [refreshFlag]);

  if (loading) {
    return <p>Loading holdings...</p>;
  }

  // ---------------- Calculations ----------------
  let totalInvestment = 0;
  let currentValue = 0;

  holdings.forEach((stock) => {
    const qty = Number(stock.qty);
    const avg = Number(stock.avg);
    const price = Number(stock.price);

    totalInvestment += avg * qty;
    currentValue += price * qty;
  });

  const pnl = currentValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0
      ? ((pnl / totalInvestment) * 100).toFixed(2)
      : "0.00";

  const isProfit = pnl >= 0;

  // ---------------- UI ----------------
  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((stock) => {
              const curValue =
                Number(stock.price) * Number(stock.qty);

              const stockPnl =
                curValue - Number(stock.avg) * Number(stock.qty);

              const stockProfit = stockPnl >= 0;

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg).toFixed(2)}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>

                  <td className={stockProfit ? "profit" : "loss"}>
                    {stockPnl.toFixed(2)}
                  </td>

                  <td className={stockProfit ? "profit" : "loss"}>
                    {stock.net}
                  </td>

                  <td className={stock.isLoss ? "loss" : "profit"}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom summary (unchanged UI) */}
      <div className="row">
        <div className="col">
          <h5>
            {(totalInvestment / 1000).toFixed(2)}
            <span>k</span>
          </h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>
            {(currentValue / 1000).toFixed(2)}
            <span>k</span>
          </h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={isProfit ? "profit" : "loss"}>
            {(pnl / 1000).toFixed(2)}k{" "}
            <span className={isProfit ? "profit" : "loss"}>
              ({pnlPercent}%)
            </span>
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
