import React, { useState } from "react";
import api from "../api/api";

const ProductForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    category: "",
    hasVariants: false,
    variants: "",
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    try {
      await api.post("/api/products", data);
      alert("✅ Product submitted successfully!");
      setData({
        name: "",
        category: "",
        hasVariants: false,
        variants: "",
        price: 0,
      });
      setStep(1);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit product");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Step {step}</h2>

      {step === 1 && (
        <>
          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            value={data.name}
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />

          <select
            name="category"
            value={data.category}
            onChange={handleChange}
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Food">Food</option>
          </select>

          <button onClick={next}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <label style={{ display: "block", marginBottom: 10 }}>
            <input
              type="checkbox"
              name="hasVariants"
              checked={data.hasVariants}
              onChange={handleChange}
            />{" "}
            Has Variants?
          </label>

          {data.hasVariants && (
            <input
              name="variants"
              placeholder="Enter variants (comma separated)"
              onChange={handleChange}
              value={data.variants}
              style={{ display: "block", width: "100%", marginBottom: 10 }}
            />
          )}

          <button onClick={prev}>Back</button>
          <button onClick={next}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={data.price}
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />

          <button onClick={prev}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default ProductForm;
