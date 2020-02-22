import Filter from "./Filter";
import PackageList from "./PackageList";
import React from "react";

const FrontPage = props => {
  return (
    <div className={"row"}>
      <div className={"left-column"}>
        <div className={"card left-card center"}>
          <h1>Welcome to the ultimate package browser</h1>
          <hr />
          <Filter
            completePackageList={props.completeList}
            packageList={props.packageList}
            setPackageList={props.setPackageList}
          />
        </div>
      </div>

      <div className={"rotated-block"} />
      <div className={"column"} />

      <div className={"column transparent"}>
        <PackageList packList={props.packageList} setPackage={props.setPackage} />
      </div>
    </div>
  );
};

export default FrontPage;
