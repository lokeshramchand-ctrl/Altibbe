import React, { useEffect, useState } from "react";
import api from "../api/api";

const ProductList: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await api.get("/api/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to load submissions:", err);
        alert("❌ Could not load submissions!");
      }
    };
    fetchSubmissions();
  }, []);

  const handleDownloadPDF = async (category: string) => {
    try {
      const res = await api.get(`/api/reports/${category}/pdf`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${category.replace(/\s+/g, "_")}_submissions.pdf`;
      link.click();
    } catch (err) {
      alert("❌ Failed to download PDF!");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "20px" }}>
      <h2>📋 All Submissions</h2>

      {submissions.length === 0 ? (
        <p>No submissions found yet.</p>
      ) : (
        submissions.map((sub: any) => (
          <div
            key={sub._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3>{sub.name || "Unnamed Product"}</h3>
            <p><strong>Category:</strong> {sub.category}</p>
            <p><strong>Price:</strong> ${sub.price || "N/A"}</p>
            <p><strong>Submitted On:</strong> {new Date(sub.createdAt).toLocaleString()}</p>

            <h4>Answers:</h4>
            <ul>
              {Array.isArray(sub.answers) && sub.answers.length > 0 ? (
                sub.answers.map((a: any, i: number) => (
                  <li key={i}>
                    <strong>{a.question}</strong>: {a.answer}
                  </li>
                ))
              ) : (
                <li>No answers submitted</li>
              )}
            </ul>

            <button
              onClick={() => handleDownloadPDF(sub.category)}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              📄 Download PDF
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
