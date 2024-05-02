import { createContext,  useContext, useState} from "react";


export const ProductIdContext = createContext();

function ProductIdProvider({children}) { 
  const [prodId, setProdId] = useState();


  return (
    <ProductIdContext.Provider value={{prodId, setProdId}}>
        {children}
    </ProductIdContext.Provider>
  )
}

export default ProductIdProvider