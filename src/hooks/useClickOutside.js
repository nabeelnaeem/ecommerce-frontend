import { useEffect } from 'react';

const useClickOutside = (ref, handler, enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [ref, handler, enabled]);
};

export default useClickOutside;
