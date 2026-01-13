import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      navigate("http://localhost:3001/login");
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />

      <div className="menus">
        <ul>
          {[
            { label: "Dashboard", path: "/" },
            { label: "Orders", path: "/orders" },
            { label: "Holdings", path: "/holdings" },
            { label: "Positions", path: "/positions" },
            { label: "Funds", path: "/funds" },
            { label: "Apps", path: "/apps" },
          ].map((item, index) => (
            <li key={item.label}>
              <Link
                to={item.path}
                onClick={() => handleMenuClick(index)}
                style={{ textDecoration: "none" }}
              >
                <p
                  className={
                    selectedMenu === index
                      ? activeMenuClass
                      : menuClass
                  }
                >
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <hr />

        {/* Profile */}
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>

        {isProfileDropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "20px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              padding: "8px 0",
              minWidth: "120px",
              zIndex: 100,
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
