import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    
    const refreshToken = async () => {
        try {
            const response = await fetch("http://localhost:11000/refreshMedecin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                withCredentials: true,
            });
            if (response.ok) {
                setAuth((prev) => {
                    console.log("prev", prev);
                    console.log("response access token", response.data.accessToken);
                    return {
                        ...prev,
                        accessToken: response.accessToken,
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