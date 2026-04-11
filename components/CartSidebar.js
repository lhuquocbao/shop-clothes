"use client"

export default function CartSidebar({ cart, setCart, isOpen, setIsOpen }) {

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // 🔥 cập nhật + lưu localStorage
  const updateCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart))
    setCart(newCart)
  }

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
      {/* 🔥 OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999
          }}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "350px",
        height: "100%",
        background: "#111",
        color: "#fff",
        padding: "20px",
        zIndex: 10000, // 🔥 CAO NHẤT
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "0.3s"
      }}>

        {/* HEADER */}
        <h2>Giỏ hàng</h2>

        {/* EMPTY */}
        {cart.length === 0 ? (
          <p>Chưa có sản phẩm</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{
                borderBottom: "1px solid #333",
                padding: "10px 0"
              }}>

                <h4>{item.name}</h4>
                <p>{item.price}đ</p>

                {/* 🔥 BUTTON FIX BUG CLICK */}
                <div onClick={(e) => e.stopPropagation()}>
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
            ))}

            <h3 style={{ marginTop: "20px" }}>
              Tổng: {total}đ
            </h3>
          </>
        )}

        {/* 🔥 NÚT ĐÓNG */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            marginTop: "20px",
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
    </>
  )
}