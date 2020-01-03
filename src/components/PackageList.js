import React from "react";

const PackageList = ({ packList, setCurPackage }) => {
  return (
    <div>
      <ul>
        {packList.map(pack => (
          <li key={pack.name}>
            <button onClick={() => setCurPackage(pack.name)}>{pack.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageList;
