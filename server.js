const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

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
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".jpeg": "image/jpeg"
};

// MAIN SERVER
const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url); // handle %20 etc

  let filePath;

  // ----------- ASSIST (STATIC ASSETS) -----------
  if (urlPath.startsWith("/assist")) {
    // Everything inside assist folder is served **exactly as-is**
    const relative = urlPath.replace("/assist", ""); // remove prefix
    filePath = path.join(ASSIST_DIR, relative);

    return serveFile(filePath, res);
  }

  // ----------- PUBLIC ROUTES -----------
  if (urlPath === "/") urlPath = "/index.html";
  else if (!path.extname(urlPath)) urlPath += ".html";

  filePath = path.join(PUBLIC_DIR, urlPath);

  serveFile(filePath, res);
});

// ----------- FILE SENDING FUNCTION -----------
function serveFile(filePath, res) {
  const ext = path.extname(filePath);
  const contentType = mime[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
