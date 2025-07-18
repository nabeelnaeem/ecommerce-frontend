import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit3, Save, X } from 'lucide-react';
import { fetchProfile, updateProfile } from '../../api/auth-service.js';
import InputField from '../../components/InputField';

// Text and class constants
const TEXT = {
    PROFILE_TITLE: "User Profile",
    EDIT_PROFILE: "Edit Profile",
    SAVE: "Save",
    SAVING: "Saving...",
    CANCEL: "Cancel",
    PERSONAL_INFO: "Personal Information",
    ACCOUNT_INFO: "Account Information",
    ACCOUNT_STATUS: "Account Status:",
    MEMBER_SINCE: "Member Since:",
    LAST_UPDATED: "Last Updated:",
    ACTIVE: "Active",
    REVOKED: "Revoked",
    USERNAME_LABEL: "Username",
    EMAIL_LABEL: "Email",
    FULL_NAME_LABEL: "Full Name",
    PHONE_LABEL: "Phone Number",
    ADDRESS_LABEL: "Address",
    FULL_NAME_PLACEHOLDER: "Enter your full name",
    PHONE_PLACEHOLDER: "Enter phone number",
    ADDRESS_PLACEHOLDER: "Enter your address",
};
const ICON_CLASS = "inline w-5 h-5 mr-2";
const ERROR_MESSAGES = {
    FULL_NAME_REQUIRED: "Full name is required",
    FULL_NAME_INVALID: "Only letters and spaces allowed",
    PHONE_REQUIRED: "Phone number is required",
    PHONE_INVALID: "Phone number must be 7 to 15 digits",
};

// CSS Class Constants
const PAGE_CONTAINER = "min-h-screen bg-gray-50 py-8 px-4";
const CONTENT_CONTAINER = "max-w-2xl mx-auto";
const CARD_STYLE = "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6";
const ACCOUNT_CARD_STYLE = "bg-white rounded-lg shadow-sm border border-gray-200 p-6";
const AVATAR_CONTAINER = "flex items-center gap-6 mb-8";
const GRID_CONTAINER = "grid gap-6 mb-8";
const BORDER_TOP_CONTAINER = "border-t border-gray-200 pt-8";
const GRID_GAP_6 = "grid gap-6";
const BUTTON_GROUP_BOTTOM = "flex gap-2 mt-6";
const ACCOUNT_INFO_GRID = "grid gap-4 text-sm";
const AVATAR_CIRCLE = "w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md";
const READONLY_INPUT = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed focus:outline-none";
const EDITABLE_INPUT = "w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-200 text-gray-900";
const ERROR_INPUT = "w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none border-red-300 focus:ring-2 focus:ring-red-200 text-gray-900";
const TEXTAREA_EDITABLE = "w-full px-3 py-2 border border-gray-300 rounded-lg resize-none transition-colors focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-200";
const TEXTAREA_READONLY = "w-full px-3 py-2 border border-gray-300 rounded-lg resize-none transition-colors focus:outline-none bg-gray-50 text-gray-700 cursor-not-allowed";
const HEADING_PRIMARY = "text-2xl font-bold text-gray-900 mb-4";
const HEADING_SECONDARY = "text-xl font-semibold text-gray-900";
const HEADING_TERTIARY = "text-lg font-semibold text-gray-900 mb-6";
const HEADING_TERTIARY_MB4 = "text-lg font-semibold text-gray-900 mb-4";
const USERNAME_TEXT = "text-gray-600";
const LABEL_STYLE = "block text-sm font-medium text-gray-700 mb-2";
const LABEL_STYLE_WITH_ICON = "block text-sm font-medium text-gray-700 mb-1 flex items-center";
const ERROR_TEXT = "mt-1 text-sm text-red-600 flex items-center";
const LOADING_CONTAINER = "min-h-screen flex items-center justify-center";
const LOADING_SPINNER = "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500";
const ACCOUNT_INFO_ITEM = "flex justify-between py-2 border-b border-gray-100";
const ACCOUNT_INFO_LABEL = "text-gray-600";
const ACCOUNT_INFO_VALUE = "text-gray-900";
const ACCOUNT_STATUS_ACTIVE = "font-medium text-green-600";
const ACCOUNT_STATUS_REVOKED = "font-medium text-red-600";
const EDIT_BUTTON = "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
const SAVE_BUTTON = "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white";
const SAVE_BUTTON_DISABLED = "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 cursor-not-allowed text-white";
const CANCEL_BUTTON = "flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({ full_name: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const { user } = await fetchProfile();
                setUserData(user);
                setEditData({
                    full_name: user.full_name || '',
                    phone: user.phone || '',
                    address: user.address || ''
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfileData();
    }, []);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        setEditData({
            full_name: userData.full_name || '',
            phone: userData.phone || '',
            address: userData.address || ''
        });
        setErrors({ full_name: '', phone: '' });
        setIsEditing(false);
    };

    const validateFields = () => {
        let isValid = true;
        const newErrors = { full_name: '', phone: '' };

        if (!editData.full_name.trim()) {
            newErrors.full_name = ERROR_MESSAGES.FULL_NAME_REQUIRED;
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(editData.full_name)) {
            newErrors.full_name = ERROR_MESSAGES.FULL_NAME_INVALID;
            isValid = false;
        }

        if (!editData.phone.trim()) {
            newErrors.phone = ERROR_MESSAGES.PHONE_REQUIRED;
            isValid = false;
        } else if (!/^[0-9]{7,15}$/.test(editData.phone)) {
            newErrors.phone = ERROR_MESSAGES.PHONE_INVALID;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (!validateFields()) return;

        setIsSubmitting(true);

        const updated = {
            username: userData.username,
            full_name: editData.full_name,
            address: editData.address,
            phone: editData.phone
        };

        try {
            await updateProfile(updated);
            setUserData(prev => ({
                ...prev,
                ...updated,
                updatedAt: new Date().toISOString()
            }));
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update profile:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        if (field === 'full_name' && /[0-9]/.test(value)) return;
        if (field === 'phone' && (!/^[0-9]*$/.test(value) || value.length > 15)) return;

        setEditData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const getInitial = (username) => username?.charAt(0).toUpperCase() || 'U';

    if (!userData || !editData) {
        return (
            <div className={LOADING_CONTAINER}>
                <div className={LOADING_SPINNER}></div>
            </div>
        );
    }

    return (
        <div className={PAGE_CONTAINER}>
            <div className={CONTENT_CONTAINER}>
                <div className={CARD_STYLE}>
                    <h1 className={HEADING_PRIMARY}>{TEXT.PROFILE_TITLE}</h1>
                    <div className={AVATAR_CONTAINER}>
                        <div className={AVATAR_CIRCLE}>{getInitial(userData.username)}</div>
                        <div>
                            <h2 className={HEADING_SECONDARY}>{userData.full_name || userData.username}</h2>
                            <p className={USERNAME_TEXT}>@{userData.username}</p>
                        </div>
                    </div>

                    <div className={GRID_CONTAINER}>
                        <div>
                            <label className={LABEL_STYLE}><User className={ICON_CLASS} />{TEXT.USERNAME_LABEL}</label>
                            <input type="text" value={userData.username} readOnly className={READONLY_INPUT} />
                        </div>
                        <div>
                            <label className={LABEL_STYLE}><Mail className={ICON_CLASS} />{TEXT.EMAIL_LABEL}</label>
                            <input type="email" value={userData.email} readOnly className={READONLY_INPUT} />
                        </div>
                    </div>

                    <div className={BORDER_TOP_CONTAINER}>
                        <h3 className={HEADING_TERTIARY}>{TEXT.PERSONAL_INFO}</h3>
                        <div className={GRID_GAP_6}>
                            <div>
                                <label className={LABEL_STYLE_WITH_ICON}><User className={ICON_CLASS} />{TEXT.FULL_NAME_LABEL}</label>
                                <InputField
                                    type="text"
                                    name="full_name"
                                    value={editData.full_name}
                                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                                    required
                                    placeholder={TEXT.FULL_NAME_PLACEHOLDER}
                                    error={errors.full_name}
                                    inputClass={isEditing ? (errors.full_name ? ERROR_INPUT : EDITABLE_INPUT) : READONLY_INPUT}
                                    labelClass="hidden"
                                    errorClass={ERROR_TEXT}
                                />
                            </div>
                            <div>
                                <label className={LABEL_STYLE_WITH_ICON}><Phone className={ICON_CLASS} />{TEXT.PHONE_LABEL}</label>
                                <InputField
                                    type="tel"
                                    name="phone"
                                    value={editData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    required
                                    placeholder={TEXT.PHONE_PLACEHOLDER}
                                    error={errors.phone}
                                    inputClass={isEditing ? (errors.phone ? ERROR_INPUT : EDITABLE_INPUT) : READONLY_INPUT}
                                    labelClass="hidden"
                                    errorClass={ERROR_TEXT}
                                />
                            </div>
                            <div>
                                <label className={LABEL_STYLE}><MapPin className={ICON_CLASS} />{TEXT.ADDRESS_LABEL}</label>
                                <textarea
                                    rows={3}
                                    value={editData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    readOnly={!isEditing}
                                    className={isEditing ? TEXTAREA_EDITABLE : TEXTAREA_READONLY}
                                    placeholder={TEXT.ADDRESS_PLACEHOLDER}
                                />
                            </div>
                        </div>

                        {isEditing ? (
                            <div className={BUTTON_GROUP_BOTTOM}>
                                <button onClick={handleSave} disabled={isSubmitting} className={isSubmitting ? SAVE_BUTTON_DISABLED : SAVE_BUTTON}>
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {TEXT.SAVING}
                                        </>
                                    ) : (
                                        <><Save size={18} /> {TEXT.SAVE}</>
                                    )}
                                </button>
                                <button onClick={handleCancel} className={CANCEL_BUTTON}>
                                    <X size={18} /> {TEXT.CANCEL}
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleEdit} className={EDIT_BUTTON}>
                                <Edit3 size={18} /> {TEXT.EDIT_PROFILE}
                            </button>
                        )}
                    </div>
                </div>

                <div className={ACCOUNT_CARD_STYLE}>
                    <h3 className={HEADING_TERTIARY_MB4}>{TEXT.ACCOUNT_INFO}</h3>
                    <div className={ACCOUNT_INFO_GRID}>
                        <div className={ACCOUNT_INFO_ITEM}>
                            <span className={ACCOUNT_INFO_LABEL}>{TEXT.ACCOUNT_STATUS}</span>
                            <span className={userData.is_revoked ? ACCOUNT_STATUS_REVOKED : ACCOUNT_STATUS_ACTIVE}>
                                {userData.is_revoked ? TEXT.REVOKED : TEXT.ACTIVE}
                            </span>
                        </div>
                        <div className={ACCOUNT_INFO_ITEM}>
                            <span className={ACCOUNT_INFO_LABEL}>{TEXT.MEMBER_SINCE}</span>
                            <span className={ACCOUNT_INFO_VALUE}>
                                {new Date(userData.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className={ACCOUNT_INFO_ITEM}>
                            <span className={ACCOUNT_INFO_LABEL}>{TEXT.LAST_UPDATED}</span>
                            <span className={ACCOUNT_INFO_VALUE}>
                                {new Date(userData.updatedAt).toLocaleString('en-US', {
                                    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;