import { createContext, useState } from "react";

export const DropDownContext = createContext();

const LoginDropDownProvider = ({children}) => {

  const [dropDown, setDropDown] = useState(false);
  
  return (
    <DropDownContext.Provider value={{dropDown, setDropDown}}>
        {children}
    </DropDownContext.Provider>
  )
}

export default LoginDropDownProvider
