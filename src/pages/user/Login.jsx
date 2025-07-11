import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    //Messages
    const DONT_HAVE_ACCOUNT_MSG = "Don't have an account?";

    //classNames
    const INPUT_LABEL_CLASS = "block mb-1";
    const INPUT_CLASS = "w-full border border-gray-50-300 p-2";
    const LOGIN_BUTTON_CLASS = "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500";
    const SIGNUP_CLASS = "text-blue-600 hover:underline";
    //variables

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in with", username, password);
    };
    return (
        <div className=" max-w-md mx-auto p-6">
            <h2 className=" text-xl font-semibold mb-4">Login</h2>
            <form className=" space-y-4" onSubmit={handleLogin}>
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
            <p className="mt-4 text-center">
                {DONT_HAVE_ACCOUNT_MSG}
                <Link to="/signup" className={SIGNUP_CLASS}>
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default Login;