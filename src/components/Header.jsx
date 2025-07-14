import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { STORE_NAME } from '../config/store-config.js'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    //Classes
    const HEADER_CLASS = "bg-gray-800 text-white p-4 flex justify-between items-center";
    const LOGO_TITLE_CLASS = " text-xl font-semibold";
    const USERNAME_CLASS = "flex items-center gap-4";
    const LOGOUT_BUTTON_CLASS = "bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded";
    const LOGIN_BUTTON_CLASS = "bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded";


    //State Variables
    const { user, logout } = useAuth();

    return (
        <header className={HEADER_CLASS}>
            {/*Logo/Branding*/}
            <h1 className={LOGO_TITLE_CLASS}>
                <Link to="/">{STORE_NAME}</Link>
            </h1>
            {/*Navigation Links*/}
            <Navbar />
            {user ? (
                <div className={USERNAME_CLASS}>
                    <span>Hello, {user}</span>
                    <button
                        onClick={logout}
                        className={LOGOUT_BUTTON_CLASS}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link to="/login" className={LOGIN_BUTTON_CLASS}>
                    Login
                </Link>
            )
            }
        </header >
    )
}
export default Header; 