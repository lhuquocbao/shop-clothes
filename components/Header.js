"use client"

import Link from "next/link"

export default function Header({ cartCount, setIsOpen }) {
  return (
    <>
      <header className="header">

        {/* LOGO */}
        <h2 className="logo">TORANO</h2>

        {/* MENU */}
        <nav className="menu">
          <Link href="/">Trang chủ</Link>

          <div className="menu-item">
            <span>Áo nam</span>
            <div className="dropdown">
              <p>Áo Polo</p>
              <p>Áo Thun</p>
              <p>Áo Sơ Mi</p>
              <p>Áo Khoác</p>
            </div>
          </div>

          <div className="menu-item">
            <span>Quần nam</span>
            <div className="dropdown">
              <p>Quần Jeans</p>
              <p>Quần Short</p>
              <p>Quần Âu</p>
            </div>
          </div>
        </nav>

        {/* CART */}
        <div
          className="cart"
          onClick={() => setIsOpen(true)}
        >
          🛒
          <span className="cart-badge">
            {cartCount}
          </span>
        </div>

      </header>

      {/* ALERT */}
      <div className="alert">
        ⚠️ CẢNH BÁO LỪA ĐẢO
      </div>
    </>
  )
}