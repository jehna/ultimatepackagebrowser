const server = require("./server/server");
const startWatcher = require("./server/statusfileWatcher");

const portNumber = process.env.PORT || 3000;
const useMockup = true;

const inputPath = useMockup ? "./status.mockup" : "/var/lib/dpkg/status";
const outputPath = "./build/data.json";

startWatcher(inputPath, outputPath);
server.listen(portNumber);
console.log(`Server running on port ${portNumber}`);
