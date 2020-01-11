const http = require("http");
const fs = require("fs");
const path = require("path");
const parser = require("./parseStatusFile")

function startWatcher(useMockup) {
  const filePath = useMockup ? "./status.mockup" : "/var/lib/dpkg/status";

  //Parse once when starting
  parser.parseStatusFile(filePath, "./build/data.json");
  // Watch the status file for changes and only parse it when needed
  // Wait is to avoid calling parser multiple times for single change operation
  let fsWait = false;
  fs.watch(filePath, (event, filename) => {
    if (filename && !fsWait) {
      fsWait = true;
      setTimeout(() => (fsWait = false), 100);
      parser.parseStatusFile(filePath, "./build/data.json");
      console.log("Re-parsed the file");
    }
  });
}



module.exports = startWatcher;