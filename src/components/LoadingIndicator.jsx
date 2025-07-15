import React from 'react';
import { LOADING_CLASS } from '../styles/styles';

// Loading Indicator Classes
const LOADING_CONTAINER = "flex justify-center items-center py-12";

const LoadingIndicator = () => {
    return (
        <div className={LOADING_CONTAINER}>
            <div className={LOADING_CLASS}></div>
        </div>
    );
};

export default LoadingIndicator;