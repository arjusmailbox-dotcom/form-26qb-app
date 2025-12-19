export default function InputField({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    description,
    error,
    register,
    ...rest
}) {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={name}>
                {label}
                {required && <span className="required">*</span>}
                {description && <div className="field-description">{description}</div>}
            </label>
            <input
                id={name}
                type={type}
                className={`form-input ${error ? 'error' : ''}`}
                placeholder={placeholder}
                onWheel={(e) => type === 'number' && e.currentTarget.blur()}
                onKeyDown={(e) => {
                    if (type === 'number' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                        e.preventDefault();
                    }
                }}
                {...register}
                {...rest}
            />
            {error && <span className="form-error">{error.message}</span>}
        </div>
    );
}
