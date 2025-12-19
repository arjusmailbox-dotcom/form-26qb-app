export default function Button({ children, variant = "primary", loading = false, ...rest }) {
    return (
        <button
            className={`btn btn-${variant}`}
            disabled={loading}
            {...rest}
        >
            {loading && <div className="spinner" />}
            {children}
        </button>
    );
}
