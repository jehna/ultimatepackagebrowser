import React from "react";

const PackageNameList = ({ packList, setCurPackage }) => {
  return (
    <div>
      <ul>
        {packList.map(pack => (
          <li key={pack}>
            <button onClick={() => setCurPackage(pack)}>{pack}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageNameList;
