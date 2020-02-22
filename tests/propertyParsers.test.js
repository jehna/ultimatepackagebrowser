const propertyParsers = require("../server/propertyParsers");


describe("Name parsing", () => {
  test("Correct name should be added to the given object", () => {
    const name = "Testname";
    const dest = {};
    propertyParsers.Package(name, dest, "\n");
    expect(dest).toEqual({ name: "Testname" });
  });

  test("Leading or trailing whitespace should be removed", () => {
    const name = " Test name ";
    const dest = {};
    propertyParsers.Package(name, dest, "\n");
    expect(dest).toEqual({ name: "Test name" });
  });
});

describe("Description parsing", () => {
  const example1 =
    "Provide access to (SM)BIOS information -- python libraries\n" +
    " libsmbios aims towards providing access to as much BIOS information as\n" +
    " possible. This package provides python functions that can be imported\n" +
    " into userspace programs.";

  const example2 = "Provide access to (SM)BIOS information -- python libraries";

  test("Correct description should be added to the given object", () => {
    const dest = {};
    propertyParsers.Description(example1, dest, "\n");
    expect(dest).toHaveProperty(
      "description",
      "libsmbios aims towards providing access to as much BIOS information as\n" +
        " possible. This package provides python functions that can be imported\n" +
        " into userspace programs.",
    );
  });

  test("Correct description title should be added to the given object", () => {
    const dest = {};
    propertyParsers.Description(example1, dest, "\n");
    expect(dest).toHaveProperty("descriptionTitle", "Provide access to (SM)BIOS information -- python libraries");
  });

  test("Should handle descriptions with title section only", () => {
    const dest = {};
    propertyParsers.Description(example2, dest, "\n");
    expect(dest).toHaveProperty("descriptionTitle", "Provide access to (SM)BIOS information -- python libraries");
    expect(dest).toHaveProperty("description", null);
  });
});

describe("Dependency parsing", () => {
  const example1 = "dehydra (<= 0.9.hg20110609-2), gcj-4.6-base (<< 4.6.1-4~), gnat-4.6 (<< 4.6.1-5~)";
  const example2 = "python2.7, python (>= 2.7.1-0ubuntu2), python (<< 2.8), libsmbios2";
  const example3 = "debconf (>= 0.5) | debconf-2.0, dpkg (>= 1.10)";

  test("Correct list of dependencies should be added to the given object", () => {
    const dest = {};
    propertyParsers.Depends(example1, dest, "\n");
    expect(dest).toEqual({dependencies: [["dehydra"], ["gcj-4.6-base"], ["gnat-4.6"]]})
  });

  test("Should not include multiple dependencies with the same name", () => {
    const dest = {};
    propertyParsers.Depends(example2, dest, "\n");
    expect(dest).toEqual({dependencies: [["libsmbios2"], ["python"], ["python2.7"]]})
  });

  test("Should handle alternative dependencies correctly", () => {
    const dest = {};
    propertyParsers.Depends(example3, dest, "\n");
    expect(dest).toEqual({dependencies: [["debconf", "debconf-2.0"], ["dpkg"]]})
  });
});
