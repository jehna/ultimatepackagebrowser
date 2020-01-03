import React from "react";

const PackageList = ({ packList, setCurPackage }) => {
  return (
    <div>
      <ul>
        {packList.map(pack => (
          <li key={pack.name}>
            <button className={"button constant-width"} onClick={() => setCurPackage(pack.name)}>
              {pack.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageList;
