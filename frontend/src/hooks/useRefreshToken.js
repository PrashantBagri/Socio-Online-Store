import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () =>{
    const {auth, setAuth} = useAuth();

    const refresh = async ()=>{
        const response = await axios.get('/users/renew-token', {
            withCredentials : true
        });
        const accessToken = response.data.data.accessToken
        const user = response.data.data.loggedInUser
        setAuth(prev=>{
            return {
                ...prev,
                user,
                accessToken,
            }
        })   
        return response.data.data.accessToken;
    }

    // console.log(auth)
    return refresh;

}

export default useRefreshToken;