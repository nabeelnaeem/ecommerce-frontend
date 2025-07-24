import { User, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import useClickOutside from '../hooks/useClickOutside';
import { useEffect } from 'react';

// Classes
const LOGIN_BUTTON_CLASS = 'flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200';
const LOGIN_ICON_CLASS = 'w-4 h-4';
const USER_BUTTON_CLASS = 'flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200';
const USER_AVATAR_CLASS = 'w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center';
const USER_AVATAR_TEXT_CLASS = 'text-white text-sm font-medium';
const USER_NAME_CLASS = 'hidden sm:inline';
const CHEVRON_ICON_CLASS = 'w-4 h-4';
const DROPDOWN_MENU_CLASS = 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50';
const DROPDOWN_CONTAINER_CLASS = 'py-2';
const DROPDOWN_ITEM_CLASS = 'block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600';
const DROPDOWN_DIVIDER_CLASS = 'my-1';
const LOGOUT_BUTTON_CLASS = 'block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-600';

const UserProfile = ({ user, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const currentPath = location.pathname + location.search;
    const loginLink = `/login?from=${encodeURIComponent(currentPath)}`

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false), isDropdownOpen);

    useEffect(() => {
        setIsDropdownOpen(false); // close dropdown when user is changed (e.g., login)
    }, [user]);

    if (!user) {
        return (
            <Link to={loginLink} className={LOGIN_BUTTON_CLASS}>
                <User className={LOGIN_ICON_CLASS} />
                <span>Login</span>
            </Link>
        );
    }
    const handleClickOnLink = () => {
        setIsDropdownOpen(false);
    }

    const displayName = user.username.charAt(0).toUpperCase() + user.username.slice(1);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={USER_BUTTON_CLASS}
            >
                <div className={USER_AVATAR_CLASS}>
                    <span className={USER_AVATAR_TEXT_CLASS}>
                        {displayName.charAt(0)}
                    </span>
                </div>
                <span className={USER_NAME_CLASS}>Hello, {displayName}</span>
                <ChevronDown className={CHEVRON_ICON_CLASS} />
            </button>

            {isDropdownOpen && (
                <div className={DROPDOWN_MENU_CLASS}>
                    <div className={DROPDOWN_CONTAINER_CLASS}>
                        <Link to="/profile" className={DROPDOWN_ITEM_CLASS} onClick={handleClickOnLink}>
                            My Profile
                        </Link>
                        <Link to="/orders" className={DROPDOWN_ITEM_CLASS} onClick={handleClickOnLink}>
                            Orders
                        </Link>
                        <hr className={DROPDOWN_DIVIDER_CLASS} />
                        <button
                            onClick={onLogout}
                            className={LOGOUT_BUTTON_CLASS}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
