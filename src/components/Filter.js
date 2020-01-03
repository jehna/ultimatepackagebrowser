import React from "react";

const Filter = ({ completePackageList, packageList, setPackageList }) => {
  function handleOnchange(event) {
    let filterStr = event.target.value.toLowerCase();
    let filteredList = completePackageList.filter(x => x.name.toLowerCase().includes(filterStr));
    setPackageList(filteredList);
  }

  return (
    <div>
      <div className={"colored"}>
        Filter packages: <input onChange={handleOnchange} />
      </div>
      {completePackageList.length !== 0 && packageList.length === 0 && (
        <div className={"colored"}>
          <p>No packages match the filter</p>
        </div>
      )}
      {completePackageList.length === 0 && (
        <div className={"colored"}>
          <p>Retrieving packages</p>
        </div>
      )}
    </div>
  );
};

export default Filter;
