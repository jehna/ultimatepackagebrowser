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

  // Check if package is included in the file
  function exists(name) {
    return completeList.find(x => x.name === name) !== undefined;
  }

  function setCurPackage(name) {
    _setCurPackage(completeList.find(x => x.name === name));
    window.scrollTo(0, 0)
  }

  // Call this to return to complete list view
  function listAll() {
    setPackageList(completeList);
    _setCurPackage(null);
  }


  // Handle the data loading after UI is rendered
  useEffect(() => {
    fetch("data.json")
      .then(res => res.json())
      .then(res => {
        setCompleteList(res);
        setPackageList(res);
      });
  }, []);

  if (curPackage === null) {
    return (
      <div className={"row"}>
        <div className={"left-column"}>
            <div className={"card left-card center"}>
              <h1>Welcome to the ultimate package browser</h1>
              <hr/>
              <Filter completePackageList={completeList} packageList={packageList} setPackageList={setPackageList} />
            </div>
        </div>

        <div className={"rotated-block"}/>
        <div className={"column"}/>

        <div className={"column transparent"}>
          <PackageList packList={packageList} setCurPackage={setCurPackage} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={"package-container"}>
          <Package pack={curPackage} setCurPackage={setCurPackage} listAll={listAll} exists={exists} />
      </div>
    );
  }
}

export default App;
