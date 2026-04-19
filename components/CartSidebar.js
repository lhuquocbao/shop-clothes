"use client"

import { useEffect, useState } from "react"

export default function CartSidebar({ cart = [], setCart, isOpen, setIsOpen }) {
  const [isClient, setIsClient] = useState(false)

  // Đảm bảo localStorage chỉ chạy trên trình duyệt để tránh lỗi Hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  const total = (cart || []).reduce(
    (sum, item) => {
      const discountedPrice = item.sale 
        ? item.price * (1 - item.sale / 100) 
        : item.price;
      return sum + discountedPrice * item.quantity;
    },
    0
  )

  const updateCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart))
    setCart(newCart)
  }

  if (!isClient) return null; // Không render gì trên server để tránh lỗi lệch cấu trúc

  const increase = (id) => {
    const newCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    updateCart(newCart)
  }

  const decrease = (id) => {
    const newCart = cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)

    updateCart(newCart)
  }

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id)
    updateCart(newCart)
  }

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999
          }}
        />
      )}

      {/* SIDEBAR */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "350px",
        height: "100vh",
        background: "#111",
        color: "#fff",
        zIndex: 10000,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column"   // 🔥 QUAN TRỌNG
      }}>

        {/* HEADER */}
        <div style={{ padding: "20px", borderBottom: "1px solid #333" }}>
          <h2>Giỏ hàng</h2>
        </div>

        {/* LIST (SCROLL) */}
        <div style={{
          flex: 1,
          overflowY: "auto",   // 🔥 SCROLL Ở ĐÂY
          padding: "20px"
        }}>

          {cart.length === 0 ? (
            <p>Chưa có sản phẩm</p>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{
                borderBottom: "1px solid #333",
                padding: "10px 0"
              }}>

                <h4>{item.name}</h4>
                <p>
                  {item.sale > 0 ? (
                    <span>{(item.price * (1 - item.sale / 100)).toLocaleString()}đ</span>
                  ) : (
                    <span>{item.price.toLocaleString()}đ</span>
                  )}
                </p>

                <div>
                  <button onClick={() => decrease(item.id)}>-</button>

                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>

                  <button onClick={() => increase(item.id)}>+</button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{ marginTop: "5px" }}
                >
                  ❌ Xóa
                </button>

              </div>
            ))
          )}
        </div>

        {/* FOOTER (CỐ ĐỊNH) */}
        <div style={{
          padding: "20px",
          borderTop: "1px solid #333"
        }}>
          <h3>Tổng: {total.toLocaleString()}đ</h3>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
              background: "red",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Đóng
          </button>
        </div>

      </div>
    </>
  )
}