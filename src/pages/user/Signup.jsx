import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth-service";
import InputField from "../../components/InputField.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Class Constants
const CONTAINER_DIV_CLASS = "max-w-md mx-auto p-6";
const TITLE_CLASS = "text-xl font-semibold mb-4";
const FORM_CLASS = "space-y-4";
const SIGNUP_BUTTON_CLASS = "w-full bg-green-600 text-white py-2 rounded hover:bg-green-500";
const PARAGRAPH_CLASS = "mt-4 text-center";
const LOGIN_LINK_CLASS = "text-blue-600 hover:underline";

// Messages
const SIGNUP_FAILED_MSG = "Signup failed";
const USERNAME_VALIDATION_MSG = "Username must contain only letters.";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const usernameValidation = /^[a-zA-Z]+$/;

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!usernameValidation.test(username)) {
            toast.error(USERNAME_VALIDATION_MSG);
            return;
        }

        try {
            const data = await registerUser({ username, password, email });
            toast.success(data.message || "Signup successful");
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            const errMsg = error?.response?.data?.error || SIGNUP_FAILED_MSG;
            toast.error(errMsg);
        }
    };

    return (
        <div className={CONTAINER_DIV_CLASS}>
            <h2 className={TITLE_CLASS}>Sign Up</h2>
            <form onSubmit={handleSignup} className={FORM_CLASS}>
                <InputField
                    type="text"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={SIGNUP_BUTTON_CLASS}>
                    Create Account
                </button>
            </form>
            <p className={PARAGRAPH_CLASS}>
                Already have an account?{" "}
                <Link to="/login" className={LOGIN_LINK_CLASS}>Log in</Link>
            </p>
            <ToastContainer position="top-center" autoClose={1500} />
        </div>
    );
};

export default Signup;
