const fs = require("fs");
let useMockup = true;

function parseStatusFile() {
  let filePath = useMockup ? "./status.mockup" : "/var/lib/dpkg/status";
  let packages = [];

  // Create iterator of the file so we can consume it with next()
  let fileIterator = fs
    .readFileSync(filePath)
    .toString()
    .split("\r\n")
    [Symbol.iterator]();

  // keep track of current line and next line (for multiline values)
  let line = fileIterator.next();
  let nextLine = fileIterator.next();
  let current = { name: "", description: "", dependencies: [], forwardDependencies: [] };

  // function to process all lines one step forward
  function stepIterator() {
    line = nextLine;
    nextLine = fileIterator.next();
  }

  while (!line.done) {
    let completeValue = line.value;

    // Construct multiline values correctly
    while (!nextLine.done && nextLine.value[0] == " ") {
      stepIterator();
      completeValue += "\n";
      completeValue += line.value;
    }

    if (completeValue.startsWith("Package: ")) {
      current.name = completeValue.slice(9);
    } else if (completeValue.startsWith("Description: ")) {
      current.description = completeValue.slice(13);
    } else if (completeValue.startsWith("Depends: ")) {
      current.dependencies = current.dependencies.concat(
        completeValue
          .slice(9)
          .split(",")
          .map(x => x.split(" ").filter(x => x !== "")[0]),
      );
    } else if (completeValue === "") {
      // Empty line means end of current package, save result and initialize next one
      packages.push(current);
      current = current = { name: "", description: "", dependencies: [], forwardDependencies: [] };
    }

    stepIterator();
  }

  // make a second pass to add forwardDependencies
  packages.forEach(pac => {
    pac.dependencies.forEach(dep => {
      // Not all dependencies are necessarily installed so have to check for it
      let dependency = packages.find(x => x.name === dep);
      if (dependency != undefined) dependency.forwardDependencies.push(pac.name);
    });
  });

  return packages;
}
