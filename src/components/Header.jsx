import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from "./Navbar";
import Logo from './Logo.jsx';
import UserProfile from './UserProfile.jsx';
import CartDropdown from './CartDropDown.jsx';

// Header container classes
const HEADER_CLASS = 'bg-white shadow-lg sticky top-0 z-40';
const HEADER_CONTAINER_CLASS = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
const HEADER_INNER_CLASS = 'flex items-center justify-between h-16';

// Logo container classes
const LOGO_CONTAINER_CLASS = 'flex-shrink-0';

// Navigation classes
const DESKTOP_NAV_CLASS = 'hidden md:block';
const MOBILE_NAV_TRIGGER_CLASS = 'md:hidden text-gray-700 hover:text-blue-600 transition-colors duration-200';
const MOBILE_NAV_ICON_CLASS = 'w-6 h-6';
const MOBILE_NAV_MENU_CLASS = 'md:hidden py-4 border-t';

// Right side actions classes
const ACTIONS_CONTAINER_CLASS = 'flex items-center space-x-4';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <header className={HEADER_CLASS}>
            <div className={HEADER_CONTAINER_CLASS}>
                <div className={HEADER_INNER_CLASS}>
                    {/* Logo */}
                    <div className={LOGO_CONTAINER_CLASS}>
                        <Logo />
                    </div>

                    {/* Desktop Navigation */}
                    <div className={DESKTOP_NAV_CLASS}>
                        <Navbar />
                    </div>

                    {/* Right side actions */}
                    <div className={ACTIONS_CONTAINER_CLASS}>
                        {/* Shopping Cart */}
                        <CartDropdown />

                        {/* User Profile */}
                        <UserProfile user={user} onLogout={logout} />

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={MOBILE_NAV_TRIGGER_CLASS}
                        >
                            {isMobileMenuOpen ? (
                                <X className={MOBILE_NAV_ICON_CLASS} />
                            ) : (
                                <Menu className={MOBILE_NAV_ICON_CLASS} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className={MOBILE_NAV_MENU_CLASS}>
                        <Navbar isMobile={true} onClose={() => setIsMobileMenuOpen(false)} />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;