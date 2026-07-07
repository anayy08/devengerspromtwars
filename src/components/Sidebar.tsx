import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Settings, Sparkles } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar card-glass animate-fade-in">
      <div className="sidebar-header">
        <Sparkles color="rgb(var(--primary-rgb))" size={28} className="animate-glow" />
        <h2 className="gradient-text" style={{ fontSize: '1.25rem', margin: 0 }}>Devengers</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          end
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/prep" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <CheckSquare size={20} />
          <span>Prep Checklist</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}
