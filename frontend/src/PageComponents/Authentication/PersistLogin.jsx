import { Outlet } from "react-router";
import {useState, useEffect} from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {

  const [isLoading, setIsLoading] = useState(true);
  const {auth, persist} = useAuth();
  const refresh = useRefreshToken();

  useEffect(()=>{
    let isMounted = true;

    const verfiyRefreshToken = async () =>{
        try {
            await refresh();
          }
          catch(err){
            console.log(err)
          }
          finally{
            isMounted && setIsLoading(false)
          }
    }
    !auth?.accessToken ? verfiyRefreshToken() : setIsLoading(false)

    return ()=> isMounted = false
  },[])
  

  return (
    <div className="">
        {isLoading ? 
        <div className={` absolute h-full w-full bg-white `}>
              <div className="bg-red-600 h-[10vh] w-[10vh] mx-auto mt-[10%] rounded-full relative animate-spin">
                <div className="bg-black h-[2vh] w-[2vh] rounded-full absolute top-4 right-4"></div>
              </div>
      </div>
      : <Outlet/>}
    </div>
  )
}

export default PersistLogin