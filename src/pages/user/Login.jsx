import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api"

const Login = () => {
    //Messages
    const DONT_HAVE_ACCOUNT_MSG = "Don't have an account?";

    //classNames
    const CONTAINER_DIV_CLASS = " max-w-md mx-auto p-6";
    const TITLE_CLASS = " text-xl font-semibold mb-4";
    const CLASS_SPACE_Y4 = " space-y-4";
    const INPUT_LABEL_CLASS = "block mb-1";
    const INPUT_CLASS = "w-full border border-gray-300 p-2";
    const LOGIN_BUTTON_CLASS = "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500";
    const SIGNUP_CLASS = "text-blue-600 hover:underline";
    const PARAGRAPH_CLASS = "mt-4 text-center";
    const ERROR_CLASS = "text-red-500 mb-2";

    //Messages and string literals
    const LOGIN_FAILED_MSG = "Login failed";
    const LOGIN_SUCCESS_MSG = "Login successful";

    //variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", {
                username,
                password,
            });

            const { token } = res.data;
            localStorage.setItem("token", token); // Save JWT

            alert(LOGIN_SUCCESS_MSG);
            navigate("/"); // Redirect to homepage
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || { LOGIN_FAILED_MSG });
        }
    };


    return (
        <div className={CONTAINER_DIV_CLASS}>
            <h2 className={TITLE_CLASS}>Login</h2>
            {error && <p className={ERROR_CLASS}>{error}</p>}
            <form className={CLASS_SPACE_Y4} onSubmit={handleLogin}>
                <div>
                    <label className={INPUT_LABEL_CLASS}>User Name:</label>
                    <input
                        type="text"
                        className={INPUT_CLASS}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={INPUT_LABEL_CLASS}>Password:</label>
                    <input
                        type="password"
                        className={INPUT_CLASS}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={LOGIN_BUTTON_CLASS}
                >
                    Login
                </button>
            </form>
            <p className={PARAGRAPH_CLASS}>
                {DONT_HAVE_ACCOUNT_MSG}
                <Link to="/signup" className={SIGNUP_CLASS}>
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default Login;