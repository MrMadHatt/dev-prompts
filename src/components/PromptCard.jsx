import { useState } from 'react';
import './PromptCard.css';

function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="prompt-card">
      <div className="prompt-header">
        <h3>{prompt.title}</h3>
        <span className="category-badge">{prompt.category}</span>
      </div>
      
      <p className="prompt-text">{prompt.prompt}</p>
      
      <div className="prompt-footer">
        <div className="tags">
          {prompt.tags. map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
        
        <button 
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
    </div>
  );
}

export default PromptCard;