export default function SelectField({
    label,
    name,
    options = [],
    required = false,
    error,
    register,
    ...rest
}) {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={name}>
                {label}
                {required && <span className="required">*</span>}
            </label>
            <select
                id={name}
                className={`form-input ${error ? 'error' : ''}`}
                {...register}
                {...rest}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="form-error">{error.message}</span>}
        </div>
    );
}
