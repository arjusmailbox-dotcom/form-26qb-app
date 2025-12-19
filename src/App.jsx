import { useState, useEffect } from 'react';
import './styles/index.css';
import Form26QB from './forms/Form26QB';

function App() {
    // Theme state - default to light mode
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <div>
                            <h1>Form 26QB</h1>
                            <p className="app-subtitle">TDS on Property Transfer - Data Collection Tool</p>
                        </div>
                    </div>
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        <span className="theme-toggle-icon">
                            {theme === 'light' ? '🌙' : '☀️'}
                        </span>
                        {theme === 'light' ? 'Dark' : 'Light'}
                    </button>
                </div>
            </header>

            <main className="container">
                <Form26QB />
            </main>

            <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                <p>© 2025 Form 26QB Tool | For Internal Use Only</p>
                <p>This tool is not affiliated with the Income Tax Department of India</p>
            </footer>
        </div>
    );
}

export default App;
