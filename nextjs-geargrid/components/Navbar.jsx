import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

function Navbar() {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={'/'}>
          <img src="/logo.png" alt="GearGrid" width={120} height={30} />
        </Link>
      </p>
      <button type="button" className="cart-icon" onClick={() => {}}>
        <span className="cart-item-qty">0</span>
        <AiOutlineShopping />
      </button>
    </div>
  );
}

export default Navbar;
