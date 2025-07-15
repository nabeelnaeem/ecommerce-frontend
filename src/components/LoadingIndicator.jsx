import React from 'react';
import { LOADING_CLASS } from '../styles/styles';

const LoadingIndicator = () => {
    return (
        <div className="flex justify-center items-center py-12">
            <div className={LOADING_CLASS}></div>
        </div>
    );
};

export default LoadingIndicator;