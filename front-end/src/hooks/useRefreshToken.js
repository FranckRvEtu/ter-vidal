import useAuth from "./useAuth";
import axios from "axios";


const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    const accessToken = auth.accessToken;
    console.log("accessToken (useRefreshToken", accessToken);    

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:11000/refreshMedecin", {
                headers: {
                    'content-type': 'application/json'
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                setAuth((prev) => {
                    console.log("prev", prev);
                    console.log("response access token", response.data.accessToken);
                    return {
                        ...prev,
                        accessToken: response.data.accessToken,
                    };
                });
                return response.data.accessToken;
            }
        } catch (error) {
            console.error("Error useRefreshToken:", error);
        }
    }

    return refreshToken;
};

export default useRefreshToken;