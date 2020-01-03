import React from "react";

const Filter = ({ completePackageList, packageList, setPackageList }) => {
  function handleOnchange(event) {
    let filterStr = event.target.value.toLowerCase();
    let filteredList = completePackageList.filter(x => x.name.toLowerCase().includes(filterStr));
    setPackageList(filteredList);
  }

  return (
    <div>
      <div>Filter packages: </div>
      <input onChange={handleOnchange} />
      {completePackageList.length !== 0 && packageList.length === 0 && <p>No packages match the filter</p>}
      {completePackageList.length === 0 && <p>Retrieving packages</p>}
    </div>
  );
};

export default Filter;
