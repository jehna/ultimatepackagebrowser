import React from "react";
import PackageNameList from "./PackageNameList";

const Package = ({ pack, setCurPackage }) => {
  return (
    <div>
      <h2>{pack.name}</h2>

      <p>pack.description</p>

      <PackageNameList packList={pack.dependencies} setCurPackage={setCurPackage} />
      <PackageNameList packList={pack.forwardDependencies} setCurPackage={setCurPackage} />
    </div>
  );
};

export default Package;
