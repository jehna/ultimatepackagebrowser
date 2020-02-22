/**
 * Contains functions for parsing individual properties of a single packet.
 * The parsing system can be easily expanded to include other data fields by adding functions here
 * Function name should be same as the name of the property it parses
 * Each function takes in the string representation of the respective property, the object where the final value should be added to and line break character that the file uses.
 */
const propertyParsers = {
  // Name parsing
  Package: (str, obj, lineBreak) => {
    obj.name = str.trim();
  },

  // Description title parsing
  Description: (str, obj, lineBreak) => {
    if (str.indexOf(lineBreak) === -1) {
      // Description only contains title
      obj.description = null;
      obj.descriptionTitle = str;
    } else {
      const endOfTitleIndex = new RegExp(lineBreak).exec(str).index;
      obj.descriptionTitle = str.slice(0, endOfTitleIndex);
      obj.description = str.slice(endOfTitleIndex + lineBreak.length).trim();
    }
  },

  //Dependency parsing
  Depends: (str, obj, lineBreak) => {
    const nameWithoutVersionRegex = /(?<=^| )[^ ]*(?=$| \()/;
    // Split into individual dependencies and clear version numbers
    const dependencyArray2D = str
      .split(",")
      .map(alternatives => alternatives.split("|").map(x =>
          x.trim().match(nameWithoutVersionRegex)[0].trim(),
        ),
      );

    // Remove duplicates that appear as a result of removing version numbers
    // After quite a bit of searching, I was unable to find a better to make 2D array distinct, than to convert it to a set of strings and back
    const setArray = new Set(dependencyArray2D.map(x => JSON.stringify(x)));
    obj.dependencies = [...setArray].map(arr => [...new Set(JSON.parse(arr))]).sort();
  },
};

module.exports = propertyParsers;
