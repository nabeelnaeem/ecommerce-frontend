import { Lock } from 'lucide-react';

// Button state classes
const BASE_BUTTON_CLASSES = "w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg transition-all transform shadow-lg";
const DISABLED_BUTTON_CLASSES = "opacity-50 cursor-not-allowed";
const ENABLED_BUTTON_CLASSES = "hover:scale-105 hover:from-indigo-700 hover:to-purple-700";

// Inner content classes
const INNER_CONTAINER_CLASSES = "flex items-center justify-center space-x-2";
const LOCK_ICON_CLASSES = "w-5 h-5";

const CompleteOrderButton = ({ onSubmit, isValid }) => (
    <button
        onClick={onSubmit}
        disabled={!isValid}
        className={`${BASE_BUTTON_CLASSES} ${!isValid ? DISABLED_BUTTON_CLASSES : ENABLED_BUTTON_CLASSES}`}
    >
        <div className={INNER_CONTAINER_CLASSES}>
            <Lock className={LOCK_ICON_CLASSES} />
            <span>Complete Order</span>
        </div>
    </button>
);

export default CompleteOrderButton;