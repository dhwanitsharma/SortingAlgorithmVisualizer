import React from 'react'
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationDropdownItem = ( { onClick, type, name }) => {
    return (
        <NavDropdown.Item key={type} onClick={()=>{onClick(type)}}>
           {name}
        </NavDropdown.Item>
    )
}

export default NavigationDropdownItem