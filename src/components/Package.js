import React from "react";
import PackageDependencyList from "./PackageDependencyList";

const Package = ({ pack, setCurPackage, listAll, exists }) => {
  if (pack === undefined) {
    // Handle links leading to missing dependencies
    return (
      <div>
        <p>Package you selected is not available in the status file. This is most likely due to missing dependency</p>
        <button onClick={listAll}>&larr; Back to full listing</button>
      </div>
    );
  } else {
    return (
      <div>
        <button className={"button"} onClick={listAll}>
          &larr; Back to full listing
        </button>
        <div className={"colored package-title"}>
          <h2 className={""}>{pack.name}</h2>
        </div>

        <h4>{pack.descriptionTitle}</h4>
        <p>{pack.description}</p>

        <h4>Backward dependencies:</h4>
        <PackageDependencyList packList={pack.dependencies} setCurPackage={setCurPackage} exists={exists} />
        <h4>Forward dependencies:</h4>
        <PackageDependencyList packList={pack.forwardDependencies} setCurPackage={setCurPackage} exists={exists} />
      </div>
    );
  }
};

export default Package;
