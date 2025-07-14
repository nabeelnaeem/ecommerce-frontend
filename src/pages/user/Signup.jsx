import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api"
import InputField from "../../components/InputField.jsx"

const Signup = () => {
    //Class Names
    const CONTAINER_DIV_CLASS = " max-w-md mx-auto p-6";
    const TITLE_CLASS = " text-xl font-semibold mb-4";
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
            console.error(error);
            setError(error.response?.data?.error || SIGNUP_FAILED_MSG);
        }
    };

    return (
        <div className={CONTAINER_DIV_CLASS}>
            <h2 className={TITLE_CLASS}>Sign Up</h2>
            {error && <p className={ERROR_CLASS}>{error}</p>}
            <form onSubmit={handleSignup} className={CLASS_SPACE_Y4}>

                <InputField
                    type="text"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                >
                </InputField>
                <InputField
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </InputField>
                <InputField
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </InputField>
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