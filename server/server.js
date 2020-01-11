const http = require("http");
const fs = require("fs");
const path = require("path");

let getContentType = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const server = http.createServer((request, response) => {
  console.log(request.method + ": " + request.url);

  // Production files are in build folder
  let filePath = "./build" + request.url;

  // Redirect root call to index.html
  if (filePath === "./build/") {
    filePath = "./build/index.html";
  }

  let contentType = getContentType[String(path.extname(filePath)).toLowerCase()] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("Page not found, error 404", "utf-8");
      } else {
        response.writeHead(500);
        response.end("Internal server error: " + error.code);
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
});

module.exports = server;
