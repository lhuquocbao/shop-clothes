"use client"

export default function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "0.3s",
        cursor: "pointer",
        background: "#fff",   // 🔥 FIX
        color: "#000"         // 🔥 FIX
      }}

      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.03)"
        e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)"
      }}

      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          background: "#fff",
          height: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          src={product.image}
          style={{
            maxHeight: "100%",
            objectFit: "contain"
          }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ padding: "12px" }}>
        <h3 style={{ fontSize: "16px" }}>
          {product.name}
        </h3>

        <p style={{
          color: "red",
          fontWeight: "bold",
          marginTop: "5px"
        }}>
          {product.price}đ
        </p>

        {/* BUTTON */}
        <button
          onClick={() => addToCart(product)}
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
            transition: "0.3s"
          }}

          onMouseEnter={e => {
            e.target.style.background = "#333"
          }}

          onMouseLeave={e => {
            e.target.style.background = "black"
          }}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  )
}