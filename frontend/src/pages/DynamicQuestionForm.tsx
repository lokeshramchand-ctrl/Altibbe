import React, { useState } from "react";

interface Question {
  text: string;
  type: string;
  options?: string[];
}

interface Props {
  questions: Question[];
  onBack: () => void;
  onSubmit: (answers: Record<string, any>) => void;
}

const DynamicQuestionForm: React.FC<Props> = ({ questions, onBack, onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleChange = (qText: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [qText]: value }));
  };

  const handleFinalSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div>
      <h3>Additional Questions</h3>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <label>{q.text}</label>
          {q.type === "text" && (
            <input type="text" onChange={(e) => handleChange(q.text, e.target.value)} />
          )}
          {q.type === "number" && (
            <input type="number" onChange={(e) => handleChange(q.text, e.target.value)} />
          )}
          {q.type === "boolean" && (
            <select onChange={(e) => handleChange(q.text, e.target.value === "true")}>
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          )}
          {q.type === "select" && (
            <select onChange={(e) => handleChange(q.text, e.target.value)}>
              <option value="">Select</option>
              {q.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button onClick={onBack}>Back</button>
      <button onClick={handleFinalSubmit}>Submit</button>
    </div>
  );
};

export default DynamicQuestionForm;
