const http = require("http");
const fs = require("fs");
const path = require("path");
const parser = require("./src/backend_logic/parseStatusFile")


let portNumber = 3000;
let useMockup = true;
let filePath = useMockup ? "./status.mockup" : "/var/lib/dpkg/status";
let writeLocation = "./build/data.json";

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

let server = http.createServer((request, response) => {
  console.log(request.method + ": " + request.url);

  // Production files are in build folder
  let filePath = "./build" + request.url;

  // Redirect root call to index.html
  if (filePath === "./build/") {
    filePath = "./build/index.html";
  }

  let contentType = getContentType[String(path.extname(filePath)).toLowerCase()] || "unknown";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        fs.readFile("./build/404.html", function(error, content) {
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
});

// Watch the status file for changes and only parse it when needed
// Wait is to avoid calling parser multiple times for single change operation
let fsWait = false;
fs.watch(filePath, (event, filename) => {
  if (filename && !fsWait) {
    fsWait = true;
    setTimeout(() => (fsWait = false), 100);
    parser.parseStatusFile(filePath, writeLocation);
    console.log("Reparsed the file");
  }
});


// Parse status file once when starting server
parser.parseStatusFile(filePath, writeLocation);
server.listen(portNumber);
console.log(`Server listening for port ${portNumber}`);
