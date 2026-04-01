import React, { useState } from "react";
import axios from "axios";
import Diagram from "./components/Diagram";
import InputBox from "./components/InputBox";

function App() {
  const [query, setQuery] = useState("");
  const [diagramData, setDiagramData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateDiagram = async (input) => {
    try {
      setLoading(true);

      const res = await axios.post("https://ai-system-visualizer.onrender.com/generate", {
        query: input,
      });

      setDiagramData(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f7fb", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{
        background: "#1e293b",
        color: "white",
        padding: "15px",
        textAlign: "center",
        fontSize: "22px",
        fontWeight: "bold"
      }}>
        AI System Design Visualizer
      </div>

      {/* MAIN */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        
        <InputBox
          setQuery={(value) => {
            setQuery(value);
            generateDiagram(value);
          }}
        />

        <h2 style={{ marginTop: "10px", color: "#334155" }}>
          {query && `System: ${query}`}
        </h2>

        {loading && (
          <p style={{ color: "#2563eb", fontWeight: "bold" }}>
            ⏳ Generating architecture...
          </p>
        )}

        {!loading && <Diagram data={diagramData} />}
      </div>
    </div>
  );
}

export default App;