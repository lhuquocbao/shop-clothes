"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import HeroSlider from "../components/HeroSlider"
import CategorySection from "../components/CategorySection"
import CartSidebar from "../components/CartSidebar"
import Footer from "../components/Footer"
import products from "../data/products"

export default function Home() {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // LOAD CART
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || []
    setCart(data)
  }, [])

  // ADD TO CART
  const addToCart = (product) => {
    const exist = cart.find(item => item.id === product.id)

    let newCart

    if (exist) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    } else {
      newCart = [...cart, { ...product, quantity: 1 }]
    }

    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  return (
    <>
      <Header cartCount={cart.length} setIsOpen={setIsOpen} />

      <HeroSlider />

      <CategorySection />

      {/* 🔥 SALE */}
      <div className="sale-section">
        <h2>SẢN PHẨM KHUYẾN MÃI</h2>

        <div className="sale-list">
          {products.filter(p => p.sale).map(item => {
            const newPrice = item.price * (1 - item.sale / 100)

            return (
              <div className="sale-card" key={item.id}>
                <div className="sale-badge">-{item.sale}%</div>

                <img src={item.image} />

                <div className="sale-info">
                  <p className="sub">+4 Màu • +4 Size</p>

                  <h4>{item.name}</h4>

                  <div className="price">
                    <span className="new">
                      {newPrice.toLocaleString()}đ
                    </span>
                    <span className="old">
                      {item.price.toLocaleString()}đ
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button className="sale-btn">
          XEM TẤT CẢ SẢN PHẨM KHUYẾN MÃI
        </button>
      </div>

      {/* 🔥 BANNER */}
     <div className="banner">
  <img src="/images/anhnen1.jpg" />
</div>

      {/* 🔥 FILTER TAB */}
      <div className="filter">
        <span
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          Tất cả
        </span>

        <span onClick={() => setActiveTab("ao")}>
          Áo
        </span>

        <span onClick={() => setActiveTab("quan")}>
          Quần
        </span>
      </div>

      {/* 🔥 PRODUCT LIST */}
      <div className="grid">
        {products.map(product => {
          const newPrice = product.sale
            ? product.price * (1 - product.sale / 100)
            : product.price

          return (
            <div className="card" key={product.id}>
              
              {/* SALE BADGE */}
              {product.sale && (
                <div className="badge">
                  -{product.sale}%
                </div>
              )}

              <img src={product.image} />

              <div className="info">
                <p className="sub">+4 Màu • +4 Size</p>

                <h4>{product.name}</h4>

                <div className="price">
                  <span className="new">
                    {newPrice.toLocaleString()}đ
                  </span>

                  {product.sale && (
                    <span className="old">
                      {product.price.toLocaleString()}đ
                    </span>
                  )}
                </div>

                <button onClick={() => addToCart(product)}>
                  Thêm vào giỏ
                </button>
              </div>

            </div>
          )
        })}
      </div>

      <Footer />

      <CartSidebar
        cart={cart}
        setCart={setCart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}