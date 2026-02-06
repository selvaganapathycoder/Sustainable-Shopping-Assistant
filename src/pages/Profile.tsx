import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAppContext } from '../context/useAppContext';
import { 
  Settings, 
  Bell, 
  Shield, 
  LogOut, 
  Moon, 
  Sun,
  HelpCircle, 
  ChevronRight, 
  Mail, 
  Trash2,
  Check,
  X,
  BellOff
} from 'lucide-react';

const Profile: React.FC = () => {
  const { points, history, preferences, updatePreferences, toggleDarkMode, clearHistory } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(preferences.name);
  const [editedEmail, setEditedEmail] = useState(preferences.email);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSaveProfile = () => {
    updatePreferences({ name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(preferences.name);
    setEditedEmail(preferences.email);
    setIsEditing(false);
  };

  const handleClearHistory = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  const menuItems = [
    { 
      icon: preferences.notifications ? Bell : BellOff, 
      label: 'Notifications', 
      color: 'text-blue-500', 
      bg: 'bg-blue-50',
      darkBg: 'dark:bg-blue-900/30',
      action: () => updatePreferences({ notifications: !preferences.notifications }),
      extra: preferences.notifications ? 'On' : 'Off',
      toggle: true
    },
    { 
      icon: preferences.darkMode ? Moon : Sun, 
      label: 'Dark Mode', 
      color: 'text-purple-500', 
      bg: 'bg-purple-50',
      darkBg: 'dark:bg-purple-900/30',
      action: toggleDarkMode,
      extra: preferences.darkMode ? 'On' : 'Off',
      toggle: true
    },
    { 
      icon: Mail, 
      label: 'Email Notifications', 
      color: 'text-green-500', 
      bg: 'bg-green-50',
      darkBg: 'dark:bg-green-900/30',
      action: () => updatePreferences({ emailNotifications: !preferences.emailNotifications }),
      extra: preferences.emailNotifications ? 'On' : 'Off',
      toggle: true
    },
    { 
      icon: Shield, 
      label: 'Privacy & Security', 
      color: 'text-orange-500', 
      bg: 'bg-orange-50',
      darkBg: 'dark:bg-orange-900/30',
      action: () => alert('Privacy & Security settings coming soon!')
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      color: 'text-pink-500', 
      bg: 'bg-pink-50',
      darkBg: 'dark:bg-pink-900/30',
      action: () => alert('Help & Support coming soon!')
    },
  ];

  return (
    <div className="max-w-md mx-auto h-full px-4 pb-12">
      <Header title="My Profile" showAvatar={false} />

      {/* Profile Section */}
      <div className="flex flex-col items-center py-6 mb-6">
        <div className="w-24 h-24 rounded-[2rem] bg-primary/10 dark:bg-primary/20 border-4 border-white dark:border-gray-700 shadow-xl p-1 mb-4 relative">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
            alt={preferences.name} 
            className="rounded-[1.75rem] w-full h-full object-cover"
          />
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg hover:bg-primary/90 transition-colors"
          >
            {isEditing ? <X size={16} /> : <Settings size={16} />}
          </button>
        </div>
        
        {isEditing ? (
          <div className="w-full max-w-xs space-y-3">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white font-bold text-center focus:outline-none focus:border-primary"
              placeholder="Your Name"
            />
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm text-center focus:outline-none focus:border-primary"
              placeholder="your.email@example.com"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleSaveProfile}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Check size={16} /> Save
              </Button>
              <Button 
                variant="outline"
                onClick={handleCancelEdit}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <X size={16} /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-black text-text dark:text-white">{preferences.name}</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm flex items-center gap-1">
              <Mail size={12} /> {preferences.email}
            </p>
          </>
        )}
      </div>

      {/* Stats Section */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center border-2 border-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-2xl font-black text-primary">{history.length}</p>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total Scans</p>
          </Card>
          <Card className="p-4 text-center border-2 border-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-2xl font-black text-orange-400">{points}</p>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Eco Points</p>
          </Card>
        </div>
      </section>

      {/* Settings Section */}
      <section className="mb-8">
        <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 px-2">Settings</h3>
        <Card className="p-2 dark:bg-gray-800 dark:border-gray-700">
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {menuItems.map((item, i) => (
              <button 
                key={i} 
                onClick={item.action}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl group"
              >
                <div className={`w-10 h-10 ${item.bg} ${item.darkBg} ${item.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <item.icon size={20} />
                </div>
                <span className="flex-1 text-left font-bold text-sm text-text dark:text-white">{item.label}</span>
                {item.extra && (
                  <span className={`text-xs font-bold mr-2 ${
                    item.toggle && item.extra === 'On' 
                      ? 'text-primary' 
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {item.extra}
                  </span>
                )}
                <ChevronRight size={18} className="text-gray-300 dark:text-gray-600" />
              </button>
            ))}
          </div>
        </Card>
      </section>

      {/* Data Management Section */}
      <section className="mb-8">
        <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 px-2">Data Management</h3>
        {showClearConfirm ? (
          <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm font-bold text-text dark:text-white mb-4 text-center">
              Are you sure you want to clear all your scan history and points? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleClearHistory}
                className="flex-1 bg-red-500 hover:bg-red-600 border-red-500"
              >
                Clear All
              </Button>
            </div>
          </Card>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-center gap-2 border-orange-100 dark:border-orange-900/30 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-200"
          >
            <Trash2 size={18} /> Clear All Data
          </Button>
        )}
      </section>

      {/* Sign Out Button */}
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200"
        onClick={() => alert('Sign out functionality coming soon!')}
      >
        <LogOut size={18} /> Sign Out
      </Button>

      {/* Footer */}
      <p className="text-center text-[10px] text-gray-300 dark:text-gray-600 mt-8 font-medium">
        EcoScan v1.0.0 • Made with ❤️ for the Planet
      </p>
    </div>
  );
};

export default Profile;
