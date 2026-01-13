import React from 'react';
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className='container p-5 mb-5'>
      <div className='row text-center'>
        <h1 className='mt-5 mb-3'>Open a Zerodha Account</h1>

        <p className='text-muted'>
          Modern platforms and apps, ₹0 investments, flat ₹20 intraday and F&O trades.
        </p>

        <Link
          to="/signup"
          className='btn btn-primary fs-5 p-2 mt-3 mb-5'
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup for free
        </Link>
      </div>
    </div>
  );
}

export default OpenAccount;
