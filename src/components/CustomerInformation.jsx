import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

const LABEL_BASE_CLASS = "block font-medium text-sm text-gray-700";
const REQUIRED_CLASS = "text-red-500 ml-1";

const CONTAINER_CLASS = "bg-white rounded-2xl shadow-lg overflow-hidden";
const HEADER_CLASS = "p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50";
const HEADER_TITLE_CLASS = "text-xl font-semibold text-gray-900";
const HEADER_ICON_CLASS = "w-5 h-5 inline mr-2";
const CONTENT_CLASS = "p-6 space-y-4";

const INPUT_BASE_CLASS = "w-full px-4 py-3 border border-gray-300 rounded-xl";
const TEXTAREA_BASE_CLASS = "w-full px-4 py-3 border border-gray-300 rounded-xl resize-none";
const ERROR_TEXT_CLASS = "text-sm text-red-600 mt-1";

const CustomerInformation = ({ formData, setFormData }) => {
    const [formattedPhone, setFormattedPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');

    useEffect(() => {
        const raw = formData.phone || '';
        if (raw.length === 11) {
            setFormattedPhone(`${raw.slice(0, 4)} ${raw.slice(4)}`);
        } else {
            setFormattedPhone(raw);
        }
    }, [formData.phone]);

    const handlePhoneChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // remove non-digits
        const trimmed = rawValue.slice(0, 11); // max 11 digits

        if (trimmed.length === 11 && !/^03\d{9}$/.test(trimmed)) {
            setPhoneError('Phone number must start with 03 and contain 11 digits');
        } else {
            setPhoneError('');
        }

        setFormData({ ...formData, phone: trimmed });

        if (trimmed.length >= 5) {
            setFormattedPhone(`${trimmed.slice(0, 4)} ${trimmed.slice(4)}`);
        } else {
            setFormattedPhone(trimmed);
        }
    };

    return (
        <div className={CONTAINER_CLASS}>
            <div className={HEADER_CLASS}>
                <h2 className={HEADER_TITLE_CLASS}>
                    <User className={HEADER_ICON_CLASS} />
                    Customer Information
                </h2>
            </div>
            <div className={CONTENT_CLASS}>
                <div>
                    <label className={LABEL_BASE_CLASS}>
                        Full Name<span className={REQUIRED_CLASS}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={INPUT_BASE_CLASS}
                        placeholder="Full Name"
                        required
                    />
                </div>

                <div>
                    <label className={LABEL_BASE_CLASS}>
                        Phone Number<span className={REQUIRED_CLASS}>*</span>
                    </label>
                    <input
                        type="tel"
                        value={formattedPhone}
                        onChange={handlePhoneChange}
                        className={INPUT_BASE_CLASS}
                        placeholder="03XX XXXXXXX"
                        required
                    />
                    {phoneError && <p className={ERROR_TEXT_CLASS}>{phoneError}</p>}
                </div>

                <div>
                    <label className={LABEL_BASE_CLASS}>
                        Address<span className={REQUIRED_CLASS}>*</span>
                    </label>
                    <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={TEXTAREA_BASE_CLASS}
                        rows="3"
                        placeholder="Address"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerInformation;
