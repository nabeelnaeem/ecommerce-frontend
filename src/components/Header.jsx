import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { STORE_NAME } from '../config/store-config.js'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            {/*Logo/Branding*/}
            <h1 className=" text-xl font-semibold">
                <Link to="/">{STORE_NAME}</Link>
            </h1>
            {/*Navigation Links*/}
            <Navbar />
            {user ? (
                <div className="flex items-center gap-4">
                    <span>Hello, {user}</span>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-1 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </Link>
            )}
        </header>
    )
}
export default Header; 