const http = require("http");
const fs = require("fs");
const path = require("path");
const parser = require("./statusfileParser");

function startWatcher(inputPath, outputPath) {


  //Parse once when starting
  readParseWrite(inputPath, outputPath);

  // Watch the status file for changes and only parse it when needed
  // Wait is to avoid calling parser multiple times for single change operation
  let fsWait = false;
  fs.watch(inputPath, (event, filename) => {
    if (filename && !fsWait) {
      fsWait = true;
      setTimeout(() => (fsWait = false), 100);
      readParseWrite(inputPath, outputPath);
      console.log("Re-parsed the file");
    }
  });
}

function readParseWrite(inputPath, outputPath ) {
  // Read the whole file into memory because parsing requires info from multiple lines,
  // so benefits of line-by-line reading are limited compared to added complexity
  const fileStr = fs.readFileSync(inputPath).toString();
  const lineBreakChar = getLineBreak(fileStr);
  const parsedObject = parser.parseStatusFile(fileStr, lineBreakChar);

  fs.writeFileSync(outputPath, JSON.stringify(parsedObject));
}

// Detecting the linebreak used, just so this works on all systems that may have modified line endings
function getLineBreak(str) {
  const lfi = str.indexOf("\n", 1);
  if (lfi === -1) {
    if (str.indexOf("\r") !== -1) {
      return "\r";
    } else {
      return "\n";
    }
  } else if (str[lfi - 1] === "\r") {
    return "\r\n";
  } else {
    return "\n";
  }
}

module.exports = startWatcher;
