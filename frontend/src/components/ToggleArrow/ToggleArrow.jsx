import React from "react";
import '../../styles/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown, faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

const ToggleArrow = ({ toggle, handleToggle }) => {
  return (
    <>
    {
      toggle ?
      <FontAwesomeIcon className="text-[32px] cursor-pointer hover:text-red" icon={faCircleArrowDown} onClick={handleToggle}/>
      :
      <FontAwesomeIcon className="text-[32px] cursor-pointer hover:text-red" icon={faCircleArrowUp} onClick={handleToggle}/>
    }
    </>
  )
}

export default ToggleArrow;