import {useContext} from 'react'
import {ProductIdContext} from "../context/ProductIdProvider"

function useProdId() {
    return useContext(ProductIdContext);
}

export default useProdId