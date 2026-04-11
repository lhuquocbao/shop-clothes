"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import HeroSlider from "../components/HeroSlider"
import ProductCard from "../components/ProductCard"
import CartSidebar from "../components/CartSidebar"
import Footer from "../components/Footer"
import products from "../data/products"

export default function Home() {
  const [cart, setCart] = useState([])
const [isOpen, setIsOpen] = useState(false)
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
      {/* HEADER + CART COUNT */}
     <Header cartCount={cart.length} setIsOpen={setIsOpen} />

<HeroSlider />
      {/* PRODUCT LIST */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        padding: "30px"
      }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      <Footer />
<CartSidebar cart={cart} setCart={setCart} isOpen={isOpen} setIsOpen={setIsOpen} /> </>
  )
}