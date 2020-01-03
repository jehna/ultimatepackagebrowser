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
  let current = { name: "", descriptionTitle: "", description: "", dependencies: [], forwardDependencies: [] };

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
      // Separate description title from the body, could be done more elegantly
      let descriptionTitle = completeValue.slice(13).split("\n")[0];
      current.descriptionTitle = descriptionTitle;
      current.description = completeValue.slice(13 + descriptionTitle.length + 2);
    } else if (completeValue.startsWith("Depends: ")) {
      // Convert string into a 2D array of dependencies
      let filtered = completeValue
        .slice(9)
        .split(",")
        .map(x => x.split("|").map(x => x.trim().split(" ")[0]));

      //There are duplicate values due to omitted version numbers, following makes array distinct
      const setArray = new Set(filtered.map(x => JSON.stringify(x)));
      current.dependencies = current.dependencies.concat([...setArray].map(x => JSON.parse(x)));

    } else if (completeValue === "") {
      // Empty line means end of current package, save result and initialize next one
      packages.push(current);
      current = current = {
        name: "",
        descriptionTitle: "",
        description: "",
        dependencies: [],
        forwardDependencies: [],
      };
    }

    stepIterator();
  }

  // make a second pass to add forwardDependencies
  packages.forEach(pac => {
    pac.dependencies.forEach(depCol => {
      depCol.forEach(dep => {
        // Not all dependencies are necessarily installed so we have to check for it
        let dependency = packages.find(x => x.name === dep);
        if (dependency !== undefined) dependency.forwardDependencies.push([pac.name]);
      });
    });
  });

  packages = packages.sort((a, b) => (a.name > b.name ? 1 : -1));

  fs.writeFile(writeLocation, JSON.stringify(packages), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports.parseStatusFile = parseStatusFile;
