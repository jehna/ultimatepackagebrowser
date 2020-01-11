const server = require("./server/server");
const startWatcher = require("./server/statusFileWatcher");

let portNumber = process.env.PORT || 3000;
let useMockup = true;

startWatcher(useMockup);
server.listen(portNumber);
console.log(`Server running on port ${portNumber}`);
