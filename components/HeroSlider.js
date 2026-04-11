"use client"

import { useEffect, useState } from "react"

const images = [
  "/images/anhnen1.jpg",
  "/images/anhnen2.jpg",
  "/images/anhnen3.png"
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const prev = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1)
  }

  const next = () => {
    setIndex((index + 1) % images.length)
  }

  return (
    <div style={{
      position: "relative",
      height: "500px",
      overflow: "hidden"
    }}>
      
      {/* IMAGE */}
      <img
        src={images[index]}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      {/* LEFT BUTTON */}
      <button onClick={prev} style={{
        position: "absolute",
        top: "50%",
        left: "20px",
        transform: "translateY(-50%)",
        background: "red",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "50%"
      }}>
        ←
      </button>

      {/* RIGHT BUTTON */}
      <button onClick={next} style={{
        position: "absolute",
        top: "50%",
        right: "20px",
        transform: "translateY(-50%)",
        background: "black",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "50%"
      }}>
        →
      </button>

      {/* DOTS */}
      <div style={{
        position: "absolute",
        bottom: "10px",
        width: "100%",
        textAlign: "center"
      }}>
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              margin: "5px",
              borderRadius: "50%",
              background: i === index ? "red" : "#ccc",
              cursor: "pointer"
            }}
          ></span>
        ))}
      </div>

    </div>
  )
}