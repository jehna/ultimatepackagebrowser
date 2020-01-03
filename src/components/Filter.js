import React from "react";

const Filter = ({ completePackageList, packageList, setPackageList }) => {
  function handleOnchange(event) {
    let filterStr = event.target.value.toLowerCase();
    let filteredList = completePackageList.filter(x => x.name.toLowerCase().includes(filterStr));
    setPackageList(filteredList);
  }

  return (
    <div>
      <div className={""}>
        <p>Filter packages:</p>
        <input onChange={handleOnchange} />
      </div>
      {completePackageList.length !== 0 && packageList.length === 0 && (
        <div>
          <p>No packages match the filter</p>
        </div>
      )}
      {completePackageList.length === 0 && (
        <div>
          <p>Retrieving packages</p>
        </div>
      )}
    </div>
  );
};

export default Filter;
