import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
//import Button from "react-bootstrap/Button";
import NavigationDropdownItem from "./components/NavDropItem";

const Navigation = props => {
  const { allAlgorithms, currentlySelectedAlgorithm, onAlgorithmChange, allAlgorithmsConfig} = props;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Sorting Algorithms</Navbar.Brand>
        <NavDropdown title={ allAlgorithmsConfig[currentlySelectedAlgorithm].NAME || "Select An Algorithm" }id="basic-nav-dropdown">
          {Object.values(allAlgorithms).map((algo) => (
            <NavigationDropdownItem
              key={algo}
              onClick={() => onAlgorithmChange(algo)}
              type={algo}
              name={allAlgorithmsConfig[algo].NAME}
            />
          ))}
        </NavDropdown>
      </Navbar>
    </>
  );
};

export default Navigation;