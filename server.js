const http = require("http");
const fs = require("fs");
const path = require("path");

let portNumber = 3000;

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

http
  .createServer((request, response) => {
    console.log("REQUEST: " + request.url);

    let filePath = "./build" + request.url;

    if (filePath === "./build/") {
      filePath = "./build/index.html";
    }

    let contentType = getContentType[String(path.extname(filePath)).toLowerCase()] || "unknown";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code == "ENOENT") {
          fs.readFile("./404.html", function(error, content) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end(content, "utf-8");
          });
        } else {
          response.writeHead(500);
          response.end("Internal server error: " + error.code);
        }
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(portNumber);
console.log(`Server listening for port ${portNumber}`);
