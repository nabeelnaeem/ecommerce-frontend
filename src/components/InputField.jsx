const InputField = ({
    type = 'text',
    label,
    name,
    id,
    value,
    onChange,
    minLength,
    maxLength,
    required = false,
    placeholder = '',
    error = '',
    labelClass = "block mb-1",
    inputClass = "w-full border border-gray-300 p-2",
    errorClass = "text-red-500 text-sm mt-1"
}) => {
    return (
        <div>
            {label && <label htmlFor={id || name} className={labelClass}>{label}</label>}
            <input
                type={type}
                name={name}
                id={id || name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={inputClass}
                minLength={minLength}
                maxLength={maxLength}
            />
            {error && <p className={errorClass}>{error}</p>}
        </div>
    )
}

export default InputField;