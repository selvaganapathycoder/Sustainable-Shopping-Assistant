import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Scan, History, User, BarChart3 } from 'lucide-react';

const Navbar: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart3, label: 'Progress', path: '/progress' },
    { icon: Scan, label: 'Scan', path: '/scan', primary: true },
    { icon: History, label: 'History', path: '/history' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex justify-between items-end">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center transition-all duration-300
              ${item.primary ? '-mt-8' : ''}
              ${isActive && !item.primary ? 'text-primary' : 'text-gray-400'}
            `}
          >
            {item.primary ? (
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-green-200 border-4 border-white mb-1 active:scale-95 transition-transform">
                <item.icon className="text-white w-8 h-8" />
              </div>
            ) : (
              <item.icon className="w-6 h-6 mb-1" />
            )}
            <span className={`text-[10px] font-medium ${item.primary ? 'text-primary mt-1' : ''}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
