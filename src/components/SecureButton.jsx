import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

const BASE_BUTTON_CLASSES =
    "w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg transition-all transform shadow-lg";
const ENABLED_HOVER_CLASSES =
    "hover:scale-105 hover:from-indigo-700 hover:to-purple-700";
const DISABLED_CLASSES = "opacity-50 cursor-not-allowed";

const INNER_CONTAINER_CLASSES = "flex items-center justify-center space-x-2";
const LOCK_ICON_CLASSES = "w-5 h-5";

const SecureButton = ({
    label = "Secure Checkout",
    icon = <Lock className={LOCK_ICON_CLASSES} />,
    to = null,
    onClick = null,
    disabled = false,
    spinner = false,
}) => {
    const className = `${BASE_BUTTON_CLASSES} ${disabled ? DISABLED_CLASSES : ENABLED_HOVER_CLASSES
        }`;

    const content = (
        <div className={INNER_CONTAINER_CLASSES}>
            {icon}
            <span>{label}</span>
        </div>
    );

    if (to && !disabled) {
        return (
            <Link to={to} className="block">
                <div className={className}>{content}</div>
            </Link>
        );
    }

    return (
        <button
            type="button"
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {spinner ? (<><Spin />{content}</>) : content}
        </button>
    );
};

export default SecureButton;
