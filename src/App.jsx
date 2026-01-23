import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import promptsData from './data/prompts.json';
import { useState, useEffect } from 'react';
import './App.css';

console.log('Prompts data:', promptsData);

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Get unique categories from prompts
  const categories = [...new Set(promptsData.prompts.map(p => p.category))];

  // Filter prompts based on active category
  const filteredPrompts = activeCategory === 'All' 
    ? promptsData.prompts 
    : promptsData.prompts.filter(p => p.category === activeCategory);

  return (
    <div className="App">
      <Navbar theme={theme} setTheme={setTheme} />
      
      <div className="container">
        <Sidebar 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <main className="main-content">
          <div className="content-header">
            <h2>
              {activeCategory === 'All' 
                ? 'All Prompts' 
                :  `${activeCategory} Prompts`}
            </h2>
            <p className="prompt-count">
              {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' :  ''}
            </p>
          </div>
          
          <div className="prompts-grid">
            {filteredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;