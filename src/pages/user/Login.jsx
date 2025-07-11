import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
                    <label className=" block mb-1">User Name:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-50-300 p-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className=" block mb-1">Password:</label>
                    <input
                        type="password"
                        className="w-full border border-gray-50-300 p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default Login;