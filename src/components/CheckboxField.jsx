export default function CheckboxField({
    label,
    name,
    checked,
    onChange,
    error,
    ...rest
}) {
    return (
        <div className="form-group">
            <label className="checkbox-label" htmlFor={name}>
                <input
                    id={name}
                    type="checkbox"
                    className="form-checkbox"
                    checked={checked}
                    onChange={onChange}
                    {...rest}
                />
                <span className="checkbox-text">{label}</span>
            </label>
            {error && <span className="form-error">{error.message}</span>}
        </div>
    );
}
