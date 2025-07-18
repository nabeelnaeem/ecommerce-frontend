import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../../api/auth-service";
import { useAuth } from "../../context/AuthContext.jsx";
import InputField from "../../components/InputField.jsx";
import "react-toastify/dist/ReactToastify.css";

const CONTAINER_DIV_CLASS = "max-w-md mx-auto p-6";
const TITLE_CLASS = "text-xl font-semibold mb-4";
const FORM_CLASS = "space-y-4";
const LOGIN_BUTTON_CLASS = "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition-colors";
const PARAGRAPH_CLASS = "mt-4 text-center";
const SIGNUP_LINK_CLASS = "text-blue-600 hover:underline";

const LOGIN_SUCCESS_MSG = "Login successful";
const LOGIN_FAILED_MSG = "Login failed";
const DONT_HAVE_ACCOUNT_MSG = "Don't have an account?";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { token, user } = await loginUser({ username, password });
            localStorage.setItem("token", token);
            login(user); // Update context
            toast.success(LOGIN_SUCCESS_MSG);
            // Redirect after short delay
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (err) {
            const errorMessage = err?.response?.data?.error || LOGIN_FAILED_MSG;
            toast.error(errorMessage);
        }
    };

    return (
        <div className={CONTAINER_DIV_CLASS}>
            <h2 className={TITLE_CLASS}>Login</h2>

            <form className={FORM_CLASS} onSubmit={handleLogin}>
                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className={LOGIN_BUTTON_CLASS}>
                    Login
                </button>
            </form>

            <p className={PARAGRAPH_CLASS}>
                {DONT_HAVE_ACCOUNT_MSG}{" "}
                <Link to="/signup" className={SIGNUP_LINK_CLASS}>Sign up</Link>
            </p>
            <ToastContainer position="top-center" autoClose={1500} />
        </div>
    );
};

export default Login;
