import React, { useState } from "react";

function InputBox({ setQuery }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) return;
    setQuery(input);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      
      <input
        type="text"
        placeholder="Enter system (e.g., WhatsApp, Netflix)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: "12px",
          width: "350px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "14px",
          marginRight: "10px"
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#2563eb",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Generate
      </button>

    </div>
  );
}

export default InputBox;