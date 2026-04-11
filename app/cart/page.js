"use client"

import { useEffect, useState } from "react"

export default function CartPage() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || []
    setCart(data)
  }, [])

  const increase = (id) => {
    const newCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const decrease = (id) => {
    const newCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0)

    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div style={{ padding: "30px" }}>
      <h1>Giỏ hàng</h1>

      {cart.length === 0 ? (
        <p>Chưa có sản phẩm</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ddd",
              padding: "15px 0"
            }}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.price}đ</p>

                <div>
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
              </div>

              <button onClick={() => removeItem(item.id)}>
                ❌
              </button>
            </div>
          ))}

          <h2>Tổng: {total}đ</h2>
        </>
      )}
    </div>
  )
}