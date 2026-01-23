import './Navbar.css';

function Navbar({ theme, setTheme }) {
  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className='theme-toggle-btn' onClick={handleToggle}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <h1>DevPrompts 🚀</h1>
        <p>AI Prompts for Developers</p>
      </div>
      <div className="navbar-links">
        <a href="https://github.com/MrMadHatt/dev-prompts" target="_blank" rel="noopener noreferrer">
          ⭐ GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;