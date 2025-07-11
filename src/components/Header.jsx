import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            {/*Logo/Branding*/}
            <h1 className=" text-xl font-semibold">
                <Link to="/">Ecommerce Store</Link>
            </h1>
            {/*Navigation Links*/}

            {/* Login Button */}
            <Link to="/login" className=" bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                Login
            </Link>
        </header>
    )
}