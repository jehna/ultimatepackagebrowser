import React, { useEffect, useState } from "react";
import "./App.css";
import PackageList from "./components/PackageList";
import Package from "./components/Package";
import Filter from "./components/Filter";

function App() {
  // If null, render package list, otherwise the selected package
  const [curPackage, _setCurPackage] = useState(null);
  const [completeList, setCompleteList] = useState([]);
  const [packageList, setPackageList] = useState([]);

  function exists(name) {
    return completeList.find(x => x.name === name) !== undefined;
  }

  function setCurPackage(name) {
    _setCurPackage(completeList.find(x => x.name === name));
  }

  // Call this to return to complete list view
  function listAll() {
    setPackageList(completeList);
    _setCurPackage(null);
  }


  // Handle the data loading after UI is rendered
  useEffect(() => {
    fetch("http://localhost:3001/data.json")
      .then(res => res.json())
      .then(res => {
        setCompleteList(res);
        setPackageList(res);
      });
  }, []);

  if (curPackage === null) {
    return (
      <div>
        <h1>Welcome to the ultimate package browser</h1>
        <div>
          <Filter completePackageList={completeList} packageList={packageList} setPackageList={setPackageList} />
        </div>
        <div>
          <PackageList packList={packageList} setCurPackage={setCurPackage} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Ultimate package browser</h1>
        <div>
          <Package pack={curPackage} setCurPackage={setCurPackage} listAll={listAll} exists={exists} />
        </div>
      </div>
    );
  }
}

export default App;
