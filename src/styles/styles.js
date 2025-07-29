// styles.js
export const BUTTON_CLASS = "px-4 py-2 rounded-lg font-medium transition-colors";
export const BUTTON_PRIMARY = `${BUTTON_CLASS} bg-blue-600 text-white hover:bg-blue-700`;
export const BUTTON_DISABLED = `${BUTTON_CLASS} text-gray-400 cursor-not-allowed bg-gray-100`;
export const BUTTON_SECONDARY = `${BUTTON_CLASS} text-gray-700 hover:bg-gray-100 bg-white border border-gray-300 hover:border-gray-400`;
export const BUTTON_LAST = `${BUTTON_CLASS} text-gray-700 hover:bg-gray-400 bg-white border border-gray-300 hover:border-gray-400`;

export const CARD_CLASS = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow";
export const INPUT_CLASS = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
export const SELECT_CLASS = "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500";

export const ERROR_CLASS = "bg-red-50 border border-red-200 rounded-lg p-4 mb-6";
export const LOADING_CLASS = "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500";