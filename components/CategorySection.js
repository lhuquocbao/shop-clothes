"use client"

export default function CategorySection() {
  const categories = [
    { name: "Polo", image: "/images/aopolo.jpg" },
    { name: "Áo Thun", image: "/images/aothun.jpg" },
    { name: "Quần Short", image: "/images/quanduijeans.jpg" },
    { name: "Áo Sơ Mi", image: "/images/aosomi.jpg" },
  ]

  return (
    <div className="category-section">

      {/* TITLE */}
      <div className="category-header">
        <h2>DANH MỤC SẢN PHẨM</h2>
      </div>

      {/* LIST */}
      <div className="category-list">
        {categories.map((item, index) => (
          <div key={index} className="category-card">

            <img src={item.image} />

            {/* OVERLAY */}
            <div className="overlay">
              <span>{item.name}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}