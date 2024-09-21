import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const navigate = useNavigate();
    // const url = "https://yb3ojxjsqulip3zh276dsk6vxy0bhlds.lambda-url.us-east-1.on.aws";
    const url = "http://localhost:5241";

    const loginAction = async (data) => {
        try {
            const res = await axios.post(`${url}/login?useCookies=false&useSessionCookies=false`, data);
            const { tokenType, accessToken, refreshToken, expiresIn } = res.data;

            // Store tokens in local storage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("tokenType", tokenType);
            localStorage.setItem("tokenExpiration", Date.now() + expiresIn * 1000);

            setToken(accessToken);
            navigate("/homepage");
            return res.data;
        } catch (err) {
            console.error("Login error:", err.response?.data?.message || err.message);
            throw err; // Rethrow error to be handled in the component
        }
    };

    const logOut = () => {
        setToken("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenExpiration");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, loginAction, logOut, url }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
