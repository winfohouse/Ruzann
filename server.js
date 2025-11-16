const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// 🔥 Make sure BOTH lines exist
const PUBLIC_DIR = path.join(__dirname, "public");
const ASSIST_DIR = path.join(__dirname, "assist");

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4"
};

const server = http.createServer((req, res) => {
  let urlPath = req.url;
  let filePath;

  // 1️⃣ assist routing
  if (urlPath.startsWith("/assist")) {
    let assistPath = urlPath.replace("/assist", "") || "/index.html";

    if (!path.extname(assistPath)) {
      assistPath += ".html";
    }

    filePath = path.join(ASSIST_DIR, assistPath);
  }

  // 2️⃣ public routing
  else {
    if (urlPath === "/") urlPath = "/index.html";
    if (!path.extname(urlPath)) urlPath += ".html";

    filePath = path.join(PUBLIC_DIR, urlPath);
  }

  const ext = path.extname(filePath);
  const contentType = mime[ext] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 Not Found");
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
