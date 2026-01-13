import React, { useState, useContext, useMemo } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";

const ITEMS_PER_PAGE = 10;

const WatchList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Filter stocks by search
  const filteredStocks = useMemo(() => {
    return watchlist.filter((stock) =>
      stock.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(
    filteredStocks.length / ITEMS_PER_PAGE
  );

  const currentStocks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStocks.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredStocks, currentPage]);

  return (
    <div className="watchlist-container">
      {/* Search */}
      <div className="search-container">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          className="search"
          placeholder="Search eg: infy, nifty, bank"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <span className="counts">{filteredStocks.length}</span>
      </div>

      {/* List */}
      <ul className="list">
        {currentStocks.map((stock) => (
          <WatchListItem stock={stock} key={stock.name} />
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>
          {stock.name}
        </p>

        <div className="item-info">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>

      <WatchListActions uid={stock.name} visible={hover} />
    </li>
  );
};

const WatchListActions = ({ uid, visible }) => {
  const ctx = useContext(GeneralContext);

  return (
    <span
      className="actions"
      style={{ display: visible ? "flex" : "none" }}
    >
      <span>
        <Tooltip title="Buy (B)" arrow slots={{ transition: Grow }}>
          <button
            className="buy"
            onClick={(e) => {
              e.stopPropagation();
              ctx.openTradeWindow(uid, "BUY");
            }}
          >
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell (S)" arrow slots={{ transition: Grow }}>
          <button
            className="sell"
            onClick={(e) => {
              e.stopPropagation();
              ctx.openTradeWindow(uid, "SELL");
            }}
          >
            Sell
          </button>
        </Tooltip>

        <Tooltip title="Analytics" arrow slots={{ transition: Grow }}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" arrow slots={{ transition: Grow }}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="watchlist-number">
      <ul>
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <li
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                fontWeight:
                  currentPage === page ? "600" : "400",
              }}
            >
              {page}
            </li>
          );
        })}

        <li
          onClick={() =>
            currentPage < totalPages &&
            onPageChange(currentPage + 1)
          }
        >
          Next →
        </li>
      </ul>
    </div>
  );
};
