import React from "react";

const PackageList = ({ packList, setPackage }) => {
  return (
    <div>
      <ul>
        {packList.map(pack => (
          <li key={pack.name}>
            <button className={"button constant-width"} onClick={() => setPackage(pack.name)}>
              {pack.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageList;
