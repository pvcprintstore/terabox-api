const express = require("express");
const axios = require("axios");

const app = express();

// Root route (important)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// API route
app.get("/get-video", async (req, res) => {
  try {
    let url = req.query.url;

    if (!url) {
      return res.json({ error: "No URL" });
    }

    const response = await axios.get(url);
    let html = response.data;

    let match = html.match(/"downloadUrl":"(.*?)"/);

    if (!match) {
      return res.json({ error: "Video not found" });
    }

    let videoUrl = match[1].replace(/\\u002F/g, "/");

    res.json({ video: videoUrl });

  } catch (e) {
    res.json({ error: "Failed" });
  }
});

// IMPORTANT (Railway compatible)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
