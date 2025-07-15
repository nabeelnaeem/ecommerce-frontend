import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import InputField from "../../components/InputField.jsx";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const CONTAINER_DIV_CLASS = " max-w-md mx-auto p-6";
    const TITLE_CLASS = " text-xl font-semibold mb-4";
    const SIGNUP_BUTTON_CLASS = "w-full bg-green-600 text-white py-2 rounded hover:bg-green-500";
    const LOGIN_LINK_CLASS = "text-blue-600 hover:underline";
    const CLASS_SPACE_Y4 = " space-y-4";
    const PARAGRAPH_CLASS = "mt-4 text-center";
    const USERNAME_VALIDATION__ERROR_MESSAGE = "Username must contain only letters."
    const SIGNUP_FAILED_MSG = "Signup failed";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const usernameValidation = /^[a-zA-Z]+$/;

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!usernameValidation.test(username)) {
            toast.error(USERNAME_VALIDATION__ERROR_MESSAGE);
            return;
        }

        try {
            const res = await api.post("/auth/signup", {
                username,
                password,
                email
            });
            console.log(res.data);
            toast.success(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.error || SIGNUP_FAILED_MSG;
            toast.error(errMsg);
        }
    };

    return (
        <div className={CONTAINER_DIV_CLASS}>
            <h2 className={TITLE_CLASS}>Sign Up</h2>
            <form onSubmit={handleSignup} className={CLASS_SPACE_Y4}>
                <InputField
                    type="text"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={SIGNUP_BUTTON_CLASS}>
                    Create Account
                </button>
            </form>
            <p className={PARAGRAPH_CLASS}>
                Already have an account?{" "}
                <Link to="/login" className={LOGIN_LINK_CLASS}>
                    Log in
                </Link>
            </p>
            <ToastContainer position="top-center" autoClose={1500} />
        </div>
    );
};

export default Signup;
