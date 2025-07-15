import { STORE_NAME } from '../config/store-config.js'

const Footer = () => {
    const FOOTER_CLASS = 'bg-gray-800 text-white p-2 text-center';
    let date = new Date();

    return (
        <footer className={FOOTER_CLASS}>
            <p>&copy; {date.getFullYear()} {STORE_NAME}. All rights reserved.</p>
        </footer>
    );
}

export default Footer;