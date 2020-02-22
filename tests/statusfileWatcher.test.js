const temp = require("temp").track();
const fs = require("fs");
const path = require("path");
const rewire = require("rewire");
const statusfileWatcher = rewire("../server/statusfileWatcher.js");
const getLineBreak = statusfileWatcher.__get__("getLineBreak");
const readParseWrite = statusfileWatcher.__get__("readParseWrite");
const starWatcher = require("../server/statusfileWatcher");


describe("ReadParseWrite", () => {
  test("Should read the content of a given file and write correct output", () => {
    // Using temp for temporary testing directory which is automatically removed
    temp.mkdir("testdir", (err, dirPath) => {
      const inputPath = path.join(dirPath, "input.txt");
      const outputPath = path.join(dirPath, "output.json");
      fs.writeFileSync(inputPath, example1, function(err) {
        if (err) throw err;
      });
      readParseWrite(inputPath, outputPath);
      const result = fs.readFileSync(outputPath).toString();
      expect(result).toBe(result1);
    });
  });
});

describe("startWatcher", () => {
  test("Should change the output file when input file is changed", done => {
    // Using temp for temporary testing directory which is automatically removed
    temp.mkdir("testdir", async (err, dirPath) => {
      const inputPath = path.join(dirPath, "input.txt");
      const outputPath = path.join(dirPath, "output.json");
      fs.writeFileSync(inputPath, example1, function(err) {
        if (err) throw err;
      });
      starWatcher(inputPath, outputPath);
      const result = fs.readFileSync(outputPath).toString();
      expect(result).toBe(result1);
      fs.writeFileSync(inputPath, example1, function(err) {
        if (err) throw err;
      });
      // This may not be the best solution to ensure that watcher has changed the file before checking
      setTimeout(() => {
        const changedResult = fs.readFileSync(outputPath).toString();
        expect(changedResult).toBe(result2);
        done();
      }, 1000);
    });
  });
});

describe("getLineBreak", () => {
  test("Line ending in \\r", () => {
    const result = getLineBreak("adsasdad\rassadad\rasdasd");
    expect(result).toBe("\r");
  });

  test("Line ending in \\n", () => {
    const result = getLineBreak("adsasdad\nassadad\nasdasd");
    expect(result).toBe("\n");
  });

  test("Line ending in \\r\\n", () => {
    const result = getLineBreak("adsasdad\r\nassadad\r\nasdasd");
    expect(result).toBe("\r\n");
  });

  test("Empty line at start", () => {
    const result = getLineBreak("\r\nadsasdad\r\nassadad\r\nasdasd");
    expect(result).toBe("\r\n");
  });

  test("No line breaks should return \\n", () => {
    const result = getLineBreak("asdsadad");
    expect(result).toBe("\n");
  });
});

const example1 =
  "Package: python-pkg-resources\n" +
  "Status: install ok installed\n" +
  "Priority: optional\n" +
  "Section: python\n" +
  "Installed-Size: 175\n" +
  "Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>\n" +
  "Architecture: all\n" +
  "Source: distribute\n" +
  "Version: 0.6.24-1ubuntu1\n" +
  "Replaces: python2.3-setuptools, python2.4-setuptools\n" +
  "Provides: python2.6-setuptools, python2.7-setuptools\n" +
  "Depends: python (>= 2.6), python (<< 2.8)\n" +
  "Suggests: python-distribute, python-distribute-doc\n" +
  "Conflicts: python-setuptools (<< 0.6c8-3), python2.3-setuptools (<< 0.6b2), python2.4-setuptools (<< 0.6b2)\n" +
  "Description: Package Discovery and Resource Access using pkg_resources\n" +
  " The pkg_resources module provides an API for Python libraries to\n" +
  " access their resource files, and for extensible applications and\n" +
  " frameworks to automatically discover plugins.  It also provides\n" +
  " runtime support for using C extensions that are inside zipfile-format\n" +
  " eggs, support for merging packages that have separately-distributed\n" +
  " modules or subpackages, and APIs for managing Python's current\n" +
  ' "working set" of active packages.\n' +
  "Original-Maintainer: Matthias Klose <doko@debian.org>\n" +
  "Homepage: http://packages.python.org/distribute\n" +
  "Python-Version: 2.6, 2.7";

const example2 =
  "Package: python-pkg-resources\n" +
  "Status: install ok installed\n" +
  "Priority: optional\n" +
  "Section: python\n" +
  "Installed-Size: 175\n" +
  "Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>\n" +
  "Architecture: all\n" +
  "Source: distribute\n" +
  "Version: 0.6.24-1ubuntu1\n" +
  "Replaces: python2.3-setuptools, python2.4-setuptools\n" +
  "Provides: python2.6-setuptools, python2.7-setuptools\n" +
  "Depends: python (>= 2.6), python (<< 2.8)\n" +
  "Suggests: python-distribute, python-distribute-doc\n" +
  "Conflicts: python-setuptools (<< 0.6c8-3), python2.3-setuptools (<< 0.6b2), python2.4-setuptools (<< 0.6b2)\n" +
  "Description: Package Discovery and Resource Access using pkg_resources\n" +
  " The pkg_resources module provides an API for Python libraries to\n" +
  "Original-Maintainer: Matthias Klose <doko@debian.org>\n" +
  "Homepage: http://packages.python.org/distribute\n" +
  "Python-Version: 2.6, 2.7";

const result1 =
  '[{"name":"python-pkg-resources","descriptionTitle":" Package Discovery and Resource Access using pkg_resources","description":"The pkg_resources module provides an API for Python libraries to\\n access their resource files, and for extensible appl' +
  "ications and\\n frameworks to automatically discover plugins.  It also provides\\n runtime support for using C extensions that are inside zipfile-format\\n eggs, support for merging packages that have separately-distributed\\n modules or subpackages, and APIs for managing" +
  ' Python\'s current\\n \\"working set\\" of active packages.","dependencies":[["python"]],"forwardDependencies":[]}]';

const result2 = '[{"name":"python-pkg-resources","descriptionTitle":" Package Discovery and Resource Access using pkg_resources","description":"The pkg_resources module provides an API for Python libraries to\\n access their resource files, and for extensible applications and\\n fra' +
  'meworks to automatically discover plugins.  It also provides\\n runtime support for using C extensions that are inside zipfile-format\\n eggs, support for merging packages that have separately-distributed\\n modules or subpackages, and APIs for managing Python\'s current\\n' +
  ' \\"working set\\" of active packages.","dependencies":[["python"]],"forwardDependencies":[]}]';
