import React from "react";
import PackageDependencyList from "./PackageDependencyList";

const Package = ({ pack, setCurPackage, listAll, exists }) => {

  if (pack === undefined) {
    // Handle links leading to missing dependencies
    return (
      <div>
        <p>Package you selected is not available in the status file. This is most likely due to missing dependency</p>
        <button onClick={listAll}>Back to full listing</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={listAll}>Back to full listing</button>
        <h2>{pack.name}</h2>

        <p>{pack.description}</p>

        <PackageDependencyList packList={pack.dependencies} setCurPackage={setCurPackage} exists={exists} />
        <PackageDependencyList packList={pack.forwardDependencies} setCurPackage={setCurPackage} exists={exists} />
      </div>
    );
  }


};

export default Package;
