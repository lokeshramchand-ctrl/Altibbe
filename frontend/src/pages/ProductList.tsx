import React, { useEffect, useState } from "react";
import api from "../api/api";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <h2>All Products</h2>
      {products.map((p: any) => (
        <div key={p._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{p.name}</h3>
          <p>Category: {p.category}</p>
          <p>Price: ${p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
