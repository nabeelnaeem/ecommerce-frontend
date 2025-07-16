import { Link } from "react-router-dom";
import { ChevronDown } from 'lucide-react';

const Navbar = ({ isMobile = false, onClose }) => {
    // Responsive classes based on mobile/desktop
    const NAV_CLASS = isMobile
        ? "flex flex-col w-full"
        : "flex flex-row";

    const UL_CLASS = isMobile
        ? "flex flex-col space-y-2 w-full"
        : "flex flex-row items-center space-x-8";

    const LINK_CLASS = isMobile
        ? "block py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
        : "text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium";

    // Handle link click on mobile to close menu
    const handleLinkClick = () => {
        if (isMobile && onClose) {
            onClose();
        }
    };

    return (
        <nav className={NAV_CLASS}>
            <ul className={UL_CLASS}>
                <li>
                    <Link
                        to="/"
                        className={LINK_CLASS}
                        onClick={handleLinkClick}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/products"
                        className={LINK_CLASS}
                        onClick={handleLinkClick}
                    >
                        Products
                    </Link>
                </li>
                {/* <li>
                    <Link
                        to="/about"
                        className={LINK_CLASS}
                        onClick={handleLinkClick}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact"
                        className={LINK_CLASS}
                        onClick={handleLinkClick}
                    >
                        Contact
                    </Link>
                </li> */}
            </ul>
        </nav>
    );
};

export default Navbar;