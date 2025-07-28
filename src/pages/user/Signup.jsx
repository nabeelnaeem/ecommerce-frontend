import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { registerUser, loginUser } from "../../api/auth-service";
import InputField from "../../components/InputField.jsx";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";

// Class Constants
const CONTAINER_DIV_CLASS = "max-w-md mx-auto p-6";
const TITLE_CLASS = "text-xl font-semibold mb-4";
const FORM_CLASS = "space-y-4";
const SIGNUP_BUTTON_CLASS = "w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer";
const SIGNUP_BUTTON_CLASS_DISABLED = "w-full bg-green-800 text-white py-2 rounded hover:bg-green-800";
const PARAGRAPH_CLASS = "mt-4 text-center";
const LOGIN_LINK_CLASS = "text-blue-600 hover:underline";

// Messages
const SIGNUP_FAILED_MSG = "Signup failed";
const USERNAME_VALIDATION_MSG = "Username must contain only letters.";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";

    const usernameValidation = /^[a-zA-Z0-9]+$/;

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!usernameValidation.test(username)) {
            toast.error(USERNAME_VALIDATION_MSG);
            setLoading(false);
            return;
        }

        try {
            //Signup
            const data = await registerUser({ username, password, email });

            //autologin
            const { accessToken, user } = await loginUser({ username, password });
            localStorage.setItem("accessToken", accessToken);
            login(user);

            toast.success(data.message || "Signup successful, logging in");
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1200);

        } catch (error) {
            const errMsg = error?.response?.data?.error || SIGNUP_FAILED_MSG;
            toast.error(errMsg);
            setLoading(false);
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
                    required
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className={loading ? SIGNUP_BUTTON_CLASS_DISABLED : SIGNUP_BUTTON_CLASS} disabled={loading}>
                    {loading ? "Signing up..." : "Sign up"}
                </button>
            </form>
            <p className={PARAGRAPH_CLASS}>
                Already have an account?{" "}
                <Link to={`/login?from=${encodeURIComponent(from)}`} className={LOGIN_LINK_CLASS}>
                    Log in
                </Link>
            </p>
        </div>
    );
};

export default Signup;
