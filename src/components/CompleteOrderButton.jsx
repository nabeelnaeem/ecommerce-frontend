import { Lock } from 'lucide-react';

const CompleteOrderButton = ({ onSubmit, isValid }) => (
    <button
        onClick={onSubmit}
        disabled={!isValid}
        className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg transition-all transform shadow-lg ${!isValid ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:from-indigo-700 hover:to-purple-700'
            }`}
    >
        <div className="flex items-center justify-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Complete Order</span>
        </div>
    </button>
);

export default CompleteOrderButton;
