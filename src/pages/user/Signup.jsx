import { use, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signing up with", username, email, password);
    };

    return (
        <div className=" max-w-md mx-auto p-6">
            <h2 className=" text-xl font-semibold mb-4">Sign Up</h2>
            <form onSubmit={handleSignup} className=" space-y-4">
                <div>
                    <label className=" block mb-1">User Name: </label>
                    <input type="text"
                        className="w-full border border-gray-300 p-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className=" block mb-1">Email: </label>
                    <input type="email"
                        className="w-full border border-gray-300 p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className=" block mb-1">Password: </label>
                    <input type="password"
                        className="w-full border border-gray-300 p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
                >
                    Create Account
                </button>
            </form>

            <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}

export default Signup;