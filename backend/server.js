const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { query } = req.body;

    const prompt = `
Design system architecture for ${query}.

Return ONLY JSON in this format:
{
  "nodes": [
    { "id": "1", "label": "User App" },
    { "id": "2", "label": "API Server" }
  ],
  "edges": [
    { "source": "1", "target": "2" }
  ]
}
`;

const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  }
);

    const text =
      response.data.candidates[0].content.parts[0].text;

    // Extract JSON safely
    const cleaned = text.match(/{[\s\S]*}/);
    const jsonData = JSON.parse(cleaned[0]);

    res.json(jsonData);

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "AI Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});