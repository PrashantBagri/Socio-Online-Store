import { DropDownContext } from "../context/LoginDropDownProvider";
import { useContext } from "react";

function useDropDown(){
    return useContext(DropDownContext)
}

export default useDropDown;