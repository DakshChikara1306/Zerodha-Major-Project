import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const { refreshFlag } = useContext(GeneralContext);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await api.get("/summary");
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch summary", err);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [refreshFlag]);

  if (loading || !summary) {
    return <p>Loading summary...</p>;
  }

  // ---------------- Data ----------------
  const equity = Number(summary.equity);
  const totalHoldings = Number(summary.totalHoldings);
  const totalInvestment = Number(summary.totalInvestment);
  const currentValue = Number(summary.currentValue);

  const pnl = currentValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0
      ? ((pnl / totalInvestment) * 100).toFixed(2)
      : "0.00";

  const isProfit = pnl >= 0;

  // ---------------- UI ----------------
  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      {/* Equity */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{(equity / 1000).toFixed(2)}k</h3>
            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance{" "}
              <span>{(equity / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      {/* Holdings */}
      <div className="section">
        <span>
          <p>Holdings ({totalHoldings})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {(pnl / 1000).toFixed(2)}k{" "}
              <small className={isProfit ? "profit" : "loss"}>
                {pnlPercent}%
              </small>
            </h3>
            <p>P&amp;L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>{(currentValue / 1000).toFixed(2)}k</span>
            </p>
            <p>
              Investment{" "}
              <span>{(totalInvestment / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
