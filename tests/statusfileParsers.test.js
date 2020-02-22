const statusfileParsers = require("../server/statusfileParser");

describe("parseStatusfile", () => {
  test("Should find forward dependencies correctly", () => {
    const result = statusfileParsers.parseStatusFile(example1, "\n");
    const forwardDependencies = result.find(x => x.name === "python-pkg-resources").forwardDependencies;
    expect(forwardDependencies).toEqual([["tcpd"]]);
  });

  test("Should handle missing dependency property", () => {
    const result = statusfileParsers.parseStatusFile(example1, "\n").find(x => x.name === "libws-commons-util-java");
    expect(result).toHaveProperty("dependencies", []);
  });

  test("Should parse sample data correctly", () => {
    const result = statusfileParsers.parseStatusFile(example1, "\n")
    expect(result).toEqual(completeResult1)
  });
});

const example1 =
  "Package: libws-commons-util-java\n" +
  "Status: install ok installed\n" +
  "Priority: optional\n" +
  "Section: java\n" +
  "Installed-Size: 101\n" +
  "Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>\n" +
  "Architecture: all\n" +
  "Version: 1.0.1-7\n" +
  "Description: Common utilities from the Apache Web Services Project\n" +
  " This is a small collection of utility classes, that allow high\n" +
  " performance XML processing based on SAX.\n" +
  "Original-Maintainer: Debian Java Maintainers <pkg-java-maintainers@lists.alioth.debian.org>\n" +
  "Homepage: http://ws.apache.org/commons/util/\n" +
  "\n" +
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
  "Python-Version: 2.6, 2.7\n" +
  "\n" +
  "Package: tcpd\n" +
  "Status: install ok installed\n" +
  "Multi-Arch: foreign\n" +
  "Priority: optional\n" +
  "Section: net\n" +
  "Installed-Size: 132\n" +
  "Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>\n" +
  "Architecture: amd64\n" +
  "Source: tcp-wrappers\n" +
  "Version: 7.6.q-21\n" +
  "Replaces: libwrap0 (<< 7.6-8)\n" +
  "Depends: libc6 (>= 2.4), python-pkg-resources (>= 2.4), libwrap0 (>= 7.6-4~)\n" +
  "Description: Wietse Venema's TCP wrapper utilities\n" +
  " Wietse Venema's network logger, also known as TCPD or LOG_TCP.\n" +
  " .\n" +
  " These programs log the client host name of incoming telnet,\n" +
  " ftp, rsh, rlogin, finger etc. requests.\n" +
  " .\n" +
  " Security options are:\n" +
  "  - access control per host, domain and/or service;\n" +
  "  - detection of host name spoofing or host address spoofing;\n" +
  "  - booby traps to implement an early-warning system.\n" +
  "Original-Maintainer: Marco d'Itri <md@linux.it>";

const completeResult1 = [
  {
    name: "libws-commons-util-java",
    descriptionTitle: " Common utilities from the Apache Web Services Project",
    description: "This is a small collection of utility classes, that allow high\n performance XML processing based on SAX.",
    dependencies: [],
    forwardDependencies: []
  },
  {
    name: "python-pkg-resources",
    descriptionTitle: " Package Discovery and Resource Access using pkg_resources",
    description: "The pkg_resources module provides an API for Python libraries to\n access their resource files, and for extensible applications and\n frameworks to automatically discover plugins.  It also provides\n runtime support for using C extensions that are inside zipfile-format\n eggs, support for merging packages that have separately-distributed\n modules or subpackages, and APIs for managing Python's current\n \"working set\" of active packages.",
    dependencies: [
      [
        "python"
      ]
    ],
    forwardDependencies: [
      [
        "tcpd"
      ]
    ]
  },
  {
    name: "tcpd",
    descriptionTitle: " Wietse Venema's TCP wrapper utilities",
    description: "Wietse Venema's network logger, also known as TCPD or LOG_TCP.\n .\n These programs log the client host name of incoming telnet,\n ftp, rsh, rlogin, finger etc. requests.\n .\n Security options are:\n  - access control per host, domain and/or service;\n  - detection of host name spoofing or host address spoofing;\n  - booby traps to implement an early-warning system.",
    dependencies: [
      [
        "libc6"
      ],
      [
        "libwrap0"
      ],
      [
        "python-pkg-resources"
      ]
    ],
    forwardDependencies: []
  }
]