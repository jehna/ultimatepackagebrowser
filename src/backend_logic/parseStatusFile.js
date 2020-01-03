const fs = require("fs");

/**
 * Parses the status file in given path and exports the simplified json representation
 * @param filePath where to read from
 * @param writeLocation where to write to
 */
function parseStatusFile(filePath, writeLocation) {
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

  packages = packages.sort((a,b) => a.name > b.name ? 1 : -1)

  fs.writeFile(writeLocation,JSON.stringify(packages),"utf8", err => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports.parseStatusFile = parseStatusFile;
