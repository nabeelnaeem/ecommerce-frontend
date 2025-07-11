import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { STORE_NAME } from '../config/store-config.js'

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            {/*Logo/Branding*/}
            <h1 className=" text-xl font-semibold">
                <Link to="/">{STORE_NAME}</Link>
            </h1>
            {/*Navigation Links*/}
            <Navbar />
            {/* Login Button */}
            <Link to="/login" className=" bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                Login
            </Link>
        </header>
    )
}
export default Header; 