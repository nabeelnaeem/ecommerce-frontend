import { Link } from "react-router-dom";

const Navbar = () => {
    const NAV_CLASS = "flex flex-row gap-4";
    const UL_CLASS = "flex space-x-4";
    const LINK_CLASS = "hover:underline";

    return (
        <nav className={NAV_CLASS}>
            <ul className={UL_CLASS}>
                <li>
                    <Link to="/" className={LINK_CLASS} >Home</Link>
                </li>
            </ul>
            <ul className={UL_CLASS}>
                <li>
                    <Link to="/store" className={LINK_CLASS}>Store</Link>
                </li>
            </ul>
            <ul className={UL_CLASS}>
                <li>
                    <Link to="/products" className={LINK_CLASS}>Products</Link>
                </li>
            </ul>
        </nav >
    );
}

export default Navbar;