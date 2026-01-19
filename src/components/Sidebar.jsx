import './Sidebar.css';

function Sidebar({ categories, activeCategory, onCategoryChange }) {
  return (
    <aside className="sidebar">
      <h3>Categories</h3>
      <ul className="category-list">
        <li 
          className={activeCategory === 'All' ? 'active' : ''}
          onClick={() => onCategoryChange('All')}
        >
          📚 All Prompts
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => onCategoryChange(category)}
          >
            {getCategoryIcon(category)} {category}
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Helper function for category icons
function getCategoryIcon(category) {
  const icons = {
    'Debugging': '🐛',
    'Learning': '📚',
    'Code Review': '🔍',
    'Refactoring': '♻️',
    'Documentation': '📝',
    'Ideas': '💡'
  };
  return icons[category] || '📌';
}

export default Sidebar;