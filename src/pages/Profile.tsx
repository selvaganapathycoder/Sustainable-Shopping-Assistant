import React from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAppContext } from '../context/useAppContext';
import { Settings, Bell, Shield, LogOut, Moon, HelpCircle, ChevronRight, Mail } from 'lucide-react';

const Profile: React.FC = () => {
  const { points, history } = useAppContext();

  const menuItems = [
    { icon: Bell, label: 'Notifications', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Moon, label: 'Dark Mode', color: 'text-purple-500', bg: 'bg-purple-50', extra: 'Off' },
    { icon: Shield, label: 'Privacy & Security', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="max-w-md mx-auto h-full px-4 pb-12">
      <Header title="My Profile" showAvatar={false} />

      <div className="flex flex-col items-center py-6 mb-6">
        <div className="w-24 h-24 rounded-[2rem] bg-primary/10 border-4 border-white shadow-xl p-1 mb-4 relative">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
            alt="Alex" 
            className="rounded-[1.75rem] w-full h-full object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
            <Settings size={16} />
          </div>
        </div>
        <h2 className="text-xl font-black text-text">Alex Johnson</h2>
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <Mail size={12} /> alex.eco@example.com
        </p>
      </div>

      <section className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center border-2 border-gray-50">
            <p className="text-2xl font-black text-primary">{history.length}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Scans</p>
          </Card>
          <Card className="p-4 text-center border-2 border-gray-50">
            <p className="text-2xl font-black text-orange-400">{points}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Eco Points</p>
          </Card>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">Settings</h3>
        <Card className="p-2">
          <div className="divide-y divide-gray-50">
            {menuItems.map((item, i) => (
              <button key={i} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl">
                <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center`}>
                  <item.icon size={20} />
                </div>
                <span className="flex-1 text-left font-bold text-sm text-text">{item.label}</span>
                {item.extra && <span className="text-xs font-bold text-gray-400 mr-2">{item.extra}</span>}
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        </Card>
      </section>

      <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200">
        <LogOut size={18} /> Sign Out
      </Button>

      <p className="text-center text-[10px] text-gray-300 mt-8 font-medium">
        EcoScan v1.0.0 • Made with ❤️ for the Planet
      </p>
    </div>
  );
};

export default Profile;
