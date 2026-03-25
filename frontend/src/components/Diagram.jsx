import React from "react";
import ReactFlow, { Controls, MiniMap, Background } from "reactflow";
import "reactflow/dist/style.css";


function Diagram({ data }) {
  if (!data) {
    return <p>Enter a system to generate diagram</p>;
  }

  const nodes = data.nodes.map((node, index) => {
    let bg = "#e2e8f0";

    if (node.label.toLowerCase().includes("db"))
      bg = "#fca5a5"; // red

    else if (node.label.toLowerCase().includes("server"))
      bg = "#86efac"; // green

    else if (node.label.toLowerCase().includes("client"))
      bg = "#93c5fd"; // blue

    return {
      id: node.id,
      data: { label: node.label },
      position: { x: (index % 5) * 200, y: Math.floor(index / 5) * 150 },
      style: {
        background: bg,
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #333",
      },
    };
  });

  const edges = data.edges.map((edge, index) => ({
    id: "e" + index,
    source: edge.source,
    target: edge.target,
  }));

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
  <Controls />
  <MiniMap />
  <Background />
</ReactFlow>
    </div>
  );
}

export default Diagram;