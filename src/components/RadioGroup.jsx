export default function RadioGroup({ label, name, options, register, error }) {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <div className="radio-group">
                {options.map((option) => (
                    <div key={option.value} className="radio-option">
                        <input
                            type="radio"
                            id={`${name}-${option.value}`}
                            value={option.value}
                            {...register}
                        />
                        <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
                    </div>
                ))}
            </div>
            {error && <span className="form-error">{error.message}</span>}
        </div>
    );
}
