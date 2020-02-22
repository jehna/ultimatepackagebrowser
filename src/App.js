import React, { useEffect, useState } from "react";
import "./App.css";
import Package from "./components/Package";
import FrontPage from "./components/FrontPage";

function App() {
  // If null, render package list, otherwise the selected package
  const [curPackage, _setCurPackage] = useState(null);
  const [completeList, setCompleteList] = useState([]);
  const [packageList, setPackageList] = useState([]);

  // Check if package is included in the file
  function exists(name) {
    return completeList.find(x => x.name === name) !== undefined;
  }

  function setPackage(name) {
    _setCurPackage(completeList.find(x => x.name === name));
    window.scrollTo(0, 0);
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
      <FrontPage
        completeList={completeList}
        setPackage={setPackage}
        setPackageList={setPackageList}
        packageList={packageList}
      />
    );
  } else {
    return (
      <div className={"package-container"}>
        <Package pack={curPackage} setPackage={setPackage} listAll={listAll} exists={exists} />
      </div>
    );
  }
}

export default App;
