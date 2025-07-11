import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex flex-row gap-4">
            <ul className=" flex space-x-4">
                <li>
                    <Link to="/" className=" hover:underline">Home</Link>
                </li>
            </ul>
            <ul className=" flex space-x-4">
                <li>
                    <Link to="/store" className=" hover:underline">Store</Link>
                </li>
            </ul>
            <ul className=" flex space-x-4">
                <li>
                    <Link to="/products" className=" hover:underline">Products</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;