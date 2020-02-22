import React from "react";
import PackageDependencyList from "./PackageDependencyList";

const Package = ({ pack, setPackage, listAll, exists }) => {
  return (
    <div className={"card package"}>
      <button className={"button constant-width"} onClick={listAll}>
        &larr; Back to full listing
      </button>
      <h1>Detailed view</h1>
      <hr />
      <div className={"colored package-title"}>
        <h2 className={""}>{pack.name}</h2>
      </div>
      <hr />
      <h4>{pack.descriptionTitle}</h4>
      <p>{pack.description}</p>
      <hr />

      <h4>Backward dependencies:</h4>
      <PackageDependencyList packList={pack.dependencies} setPackage={setPackage} exists={exists} />
      <h4>Forward dependencies:</h4>
      <PackageDependencyList packList={pack.forwardDependencies} setPackage={setPackage} exists={exists} />
    </div>
  );
};

export default Package;
