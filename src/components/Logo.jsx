import { STORE_NAME } from '../config/store-config.js'
import { Link } from "react-router-dom";

const CONTAINER_CLASS = 'flex items-center space-x-2';
const LOGO_WRAPPER_CLASS = 'w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center';
const LOGO_TEXT_CLASS = 'text-white font-bold text-sm';
const STORE_LINK_CLASS = 'text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200';

const HeaderLogo = () => (
    <div className={CONTAINER_CLASS}>
        <div className={LOGO_WRAPPER_CLASS}>
            <span className={LOGO_TEXT_CLASS}>{STORE_NAME.charAt(0)}</span>
        </div>
        <Link to="/" className={STORE_LINK_CLASS}>
            {STORE_NAME}
        </Link>
    </div>
);

export default HeaderLogo;