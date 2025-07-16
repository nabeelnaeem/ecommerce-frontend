import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from "./Navbar";
import Logo from './Logo.jsx';
import UserProfile from './UserProfile.jsx';
import CartDropdown from './CartDropDown.jsx';


const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <Navbar />
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Shopping Cart */}
                        <CartDropdown />

                        {/* User Profile */}
                        <UserProfile user={user} onLogout={logout} />

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <Navbar isMobile={true} onClose={() => setIsMobileMenuOpen(false)} />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;