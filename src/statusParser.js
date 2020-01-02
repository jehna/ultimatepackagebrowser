const readline = require("readline");
const fs = require("fs");
const sleep = require("thread-sleep");
let useMockup = true;


function parseStatusFile() {
  let filePath = useMockup ? "./status.mockup" : "/var/lib/dpkg/status";
  let packages = [];

  // Create iterator of the file so we can consume it with next()
  let fileIterator = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    [Symbol.iterator]();

  // keep track of current line and next line (for multiline statements)
  let [line, finished] = fileIterator.next();
  let [nextLine, tmp] = fileIterator.next();
  let current = {};

  // function to process all lines one step forward
  function stepIterator() {
    line = nextLine;
    finished = tmp;
    [nextLine, tmp] = fileIterator.next();
  }


}

parseStatusFile();
