import { useState } from 'react';
import { CheckSquare } from 'lucide-react';

export default function Prep() {
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Environment setup completed', checked: true },
    { id: 2, text: 'Vite React + TypeScript boilerplate initialized', checked: true },
    { id: 3, text: 'Global styling & design token system setup', checked: true },
    { id: 4, text: 'Lucide Icons package installed', checked: true },
    { id: 5, text: 'Confirm hackathon rules', checked: false },
    { id: 6, text: 'Setup Antigravity slash commands', checked: false },
    { id: 7, text: 'Test local dev server compilation', checked: false }
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1 className="gradient-text">Warm-up Checklist</h1>
        <p className="text-muted">Keep track of your pre-hackathon tasks.</p>
      </header>

      <section className="card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <CheckSquare color="rgb(var(--accent-rgb))" size={24} />
          <h3 style={{ fontSize: '1.25rem' }}>To-Do</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {checklist.map(item => (
            <div 
              key={item.id} 
              onClick={() => toggleCheck(item.id)}
              className="checklist-item"
              style={{
                opacity: item.checked ? 0.6 : 1,
                textDecoration: item.checked ? 'line-through' : 'none'
              }}
            >
              <input 
                type="checkbox" 
                checked={item.checked} 
                onChange={() => {}}
              />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
