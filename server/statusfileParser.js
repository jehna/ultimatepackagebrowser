const propertyParsers = require("./propertyParsers");

/**
 * Parses the given file and exports the simplified json representation
 * @param fileStr String representation of the file
 * @param lineBreak linebreak character used in string
 * @returns Array of packages
 */
function statusfileParser(fileStr, lineBreak) {
  const propertySplitRegex = new RegExp(lineBreak + "(?=[^ ])");
  const propertyNameRegex = /[^ ]*(?=:)/;
  const excludePropertyNameRegex = /(?<=.*:).*/s;

  let packages = [];

  // Split file into packages and call all the propertyParsers for them
  fileStr.split(lineBreak + lineBreak).forEach(packageStr => {
    let objForm = { name: "", descriptionTitle: "", description: "", dependencies: [], forwardDependencies: [] };

    // Split the string to the array of properties, multiline description is kept together
    packageStr.split(propertySplitRegex).forEach(propertyStr => {
      const propertyName = propertyStr.match(propertyNameRegex)[0];
      const content = propertyStr.match(excludePropertyNameRegex)[0];

      //Check if there is a parser for given property, and pass the content to parser
      if (propertyParsers.hasOwnProperty(propertyName)) {
        propertyParsers[propertyName](content, objForm, lineBreak);
      }
    });

    packages.push(objForm);
  });

  // make a second pass to add forwardDependencies
  packages.forEach(pac => {
    pac.dependencies.forEach(depCol => {
      depCol.forEach(dep => {
        // Not all dependencies are necessarily installed so we have to check for it
        const dependency = packages.find(x => x.name === dep);
        if (dependency !== undefined && !dependency.forwardDependencies.some(x => x[0] === pac.name)) {
          dependency.forwardDependencies.push([pac.name]);
        }
      });
    });
  });

  // Return sorted list of packages
  return packages.sort((a, b) => (a.name > b.name ? 1 : -1));
}

module.exports.parseStatusFile = statusfileParser;
