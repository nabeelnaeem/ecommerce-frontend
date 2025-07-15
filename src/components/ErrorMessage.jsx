import React from 'react';
import { ERROR_CLASS } from '../styles/styles';

// Error Message Classes
const ERROR_CONTAINER = "flex";
const ERROR_ICON_CONTAINER = "flex-shrink-0";
const ERROR_ICON = "h-5 w-5 text-red-400";
const ERROR_CONTENT = "ml-3";
const ERROR_TITLE = "text-sm font-medium text-red-800";
const ERROR_DESCRIPTION = "mt-1 text-sm text-red-700";

const ErrorMessage = ({ error }) => {
    return (
        <div className={ERROR_CLASS}>
            <div className={ERROR_CONTAINER}>
                <div className={ERROR_ICON_CONTAINER}>
                    <svg className={ERROR_ICON} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className={ERROR_CONTENT}>
                    <h3 className={ERROR_TITLE}>Error loading products</h3>
                    <p className={ERROR_DESCRIPTION}>{error}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;