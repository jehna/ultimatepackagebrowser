import React from "react";

const PackageDependencyList = ({ packList, setPackage, exists }) => {
  return (
    <div>
      <ul>
        {packList.map(packs => (
          <li key={packs}>
            {packs.map((pack, index) => (
              <span key={pack}>
                {exists(pack) ? (
                  <button className={"button constant-width"} key={index} onClick={() => setPackage(pack)}>
                    {pack}
                  </button>
                ) : (
                  <button className={"button constant-width disabled"} key={index}>
                    {pack}
                  </button>
                )}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageDependencyList;
