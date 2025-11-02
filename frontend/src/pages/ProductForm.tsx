import React, { useState } from "react";
import api from "../api/api";
import DynamicQuestionForm from "../pages/DynamicQuestionForm";

const ProductForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  // ✅ Update input values dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Fetch category-based questions
  const fetchQuestions = async () => {
    if (!data.category) {
      alert("⚠️ Please select a category first!");
      return;
    }

    try {
      const res = await api.get(`/api/questions/${data.category}`);
      setQuestions(res.data);
      setStep(2);
    } catch (err) {
      console.error("❌ Failed to load questions:", err);
      alert("Failed to load questions!");
    }
  };

  const handleSubmit = async (submittedAnswers?: Record<string, any>) => {
    try {
      if (!data.category) {
        alert("⚠️ Please select a category before submitting!");
        return;
      }

      // Prefer the passed answers; fallback to local state (just in case)
      const rawAnswers = submittedAnswers || answers;

      console.log("🔍 Raw answers before formatting:", rawAnswers);

      const formattedAnswers = Object.entries(rawAnswers).map(([question, answer]) => ({
        question,
        answer,
      }));

      console.log("📝 Submitting answers:", formattedAnswers);

      const res = await api.post(`/api/submissions/${data.category}`, {
        answers: formattedAnswers,
      });

      console.log("✅ Backend response:", res.data);
      alert("✅ Answers submitted successfully!");

      // Reset UI
      setStep(1);
      setData({ name: "", category: "", price: "" });
      setAnswers({});
    } catch (err: any) {
      console.error("💥 Submission failed:", err.response?.data || err.message);
      alert("❌ Error submitting answers!");
    }
  };


  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Step {step}</h2>

      {/* Step 1: Basic Product Info */}
      {step === 1 && (
        <>
          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            value={data.name}
          />
          <select name="category" value={data.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Food">Food</option>
            <option value="Clothing">Clothing</option>
          </select>
          <input
            name="price"
            placeholder="Price"
            value={data.price}
            onChange={handleChange}
          />
          <button onClick={fetchQuestions}>Next</button>
        </>
      )}

      {/* Step 2: Dynamic Questions */}
      {step === 2 && (
        <DynamicQuestionForm
          questions={questions}
          onBack={() => setStep(1)}
          onSubmit={(ans) => handleSubmit(ans)} // pass answers directly
        />

      )}
    </div>
  );
};

export default ProductForm;
