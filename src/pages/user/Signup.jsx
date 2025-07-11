import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api"

const Signup = () => {
    //Class Names
    const CONTAINER_DIV_CLASS = " max-w-md mx-auto p-6";
    const TITLE_CLASS = " text-xl font-semibold mb-4";
    const INPUT_LABEL_CLASS = "block mb-1";
    const INPUT_CLASS = "w-full border border-gray-300 p-2";
    const SIGNUP_BUTTON_CLASS = "w-full bg-green-600 text-white py-2 rounded hover:bg-green-500";
    const LOGIN_LINK_CLASS = "text-blue-600 hover:underline";
    const CLASS_SPACE_Y4 = " space-y-4";
    const PARAGRAPH_CLASS = "mt-4 text-center";
    const ERROR_CLASS = "text-red-500 mb-2";

    //Messages and string literals
    const SIGNUP_FAILED_MSG = "Signup failed";
    const SIGNING_UP_WITH = "Signing up with";


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();
        console.log({ SIGNING_UP_WITH }, username, email, password);
        try {
            const res = await api.post("/auth/signup", {
                username,
                password,
                email
            });
            console.log(res.data);
            alert(res.data.message);
            navigate("/login");
        } catch (error) {
            console.error(err);
            setError(err.response?.data?.error || { SIGNUP_FAILED_MSG });
        }
    };

    return (
        <div className={CONTAINER_DIV_CLASS}>
            <h2 className={TITLE_CLASS}>Sign Up</h2>
            {error && <p className={ERROR_CLASS}>{error}</p>}
            <form onSubmit={handleSignup} className={CLASS_SPACE_Y4}>
                <div>
                    <label className={INPUT_LABEL_CLASS}>User Name: </label>
                    <input type="text"
                        className={INPUT_CLASS}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={INPUT_LABEL_CLASS}>Email: </label>
                    <input type="email"
                        className={INPUT_CLASS}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={INPUT_LABEL_CLASS}>Password: </label>
                    <input type="password"
                        className={INPUT_CLASS}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={SIGNUP_BUTTON_CLASS}
                >
                    Create Account
                </button>
            </form>

            <p className={PARAGRAPH_CLASS}>
                Already have an account?{" "}
                <Link to="/login" className={LOGIN_LINK_CLASS}>
                    Log in
                </Link>
            </p>
        </div>
    );
}

export default Signup;