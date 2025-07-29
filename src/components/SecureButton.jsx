import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const BUTTON_CLASS =
    "w-full py-4 rounded-xl font-semibold text-lg transition-all transform shadow-lg bg-[linear-gradient(135deg,#6253e1,#04befe)] text-white hover:bg-[linear-gradient(135deg,#4c3bb8,#0393cb)]";

const LOCK_ICON_CLASSES = "w-5 h-5";
const INNER_CONTAINER_CLASSES = "flex items-center justify-center space-x-2";

const SecureButton = ({
    label = "Secure Checkout",
    icon = <Lock className={LOCK_ICON_CLASSES} />,
    to = null,
    onClick = null,
    disabled = false,
    spinner = false,
}) => {
    const content = (
        <div className={INNER_CONTAINER_CLASSES}>
            {icon}
            <span>{label}</span>
        </div>
    );

    if (to && !disabled) {
        return (
            <Link to={to} className="block">
                <Button
                    type="primary"
                    className={BUTTON_CLASS}
                    icon={icon}
                    size="large"
                    block
                >
                    {label}
                </Button>
            </Link>
        );
    }

    return (
        <Button
            type="primary"
            size="large"
            block
            icon={icon}
            className={BUTTON_CLASS}
            onClick={onClick}
            disabled={disabled}
            loading={spinner}
        >
            {label}
        </Button>
    );
};

export default SecureButton;
