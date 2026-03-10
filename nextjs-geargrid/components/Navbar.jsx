import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "context/StateContext";

function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={'/'}>
          <img src="/logo.png" alt="GearGrid" width={120} height={30} />
        </Link>
      </p>
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <span className="cart-item-qty">{totalQuantities}</span>
        <AiOutlineShopping />
      </button>
      {showCart && <Cart />}
    </div>
  );
}

export default Navbar;
