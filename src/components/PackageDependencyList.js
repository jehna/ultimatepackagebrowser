import React from "react";

const PackageDependencyList = ({ packList, setCurPackage, exists }) => {
  return (
    <div>
      <ul>
        {packList.map(packs => (
          <li key={packs}>
            {packs.map(pack => (
              <span key={pack}>
                {exists(pack) ? (
                  <button className={"button constant-width"} key={pack} onClick={() => setCurPackage(pack)}>
                    {pack}
                  </button>
                ) : (
                  <button className={"button constant-width disabled"} key={pack}>
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
