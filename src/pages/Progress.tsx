import React from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import { useAppContext } from '../context/useAppContext';
import { XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Award, Target, Flame, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', points: 20 },
  { name: 'Tue', points: 45 },
  { name: 'Wed', points: 30 },
  { name: 'Thu', points: 70 },
  { name: 'Fri', points: 55 },
  { name: 'Sat', points: 90 },
  { name: 'Sun', points: 120 },
];

const Progress: React.FC = () => {
  const { points } = useAppContext();

  const badges = [
    { title: 'Beginner', icon: Award, level: '🥉', color: 'text-orange-400', unlocked: true },
    { title: 'Eco Saver', icon: Award, level: '🥈', color: 'text-gray-400', unlocked: points >= 500 },
    { title: 'Planet Hero', icon: Award, level: '🥇', color: 'text-yellow-400', unlocked: points >= 1000 },
  ];

  return (
    <div className="max-w-md mx-auto h-full px-4 pb-12">
      <Header title="Your Progress" subtitle="You're doing great for the planet!" />

      <section className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/10 dark:border-primary/20">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Flame size={18} />
              <span className="text-xs font-bold uppercase">Streak</span>
            </div>
            <p className="text-2xl font-black dark:text-white">7 Days</p>
          </Card>
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 mb-1">
              <Target size={18} />
              <span className="text-xs font-bold uppercase">Daily Goal</span>
            </div>
            <p className="text-2xl font-black dark:text-white">85%</p>
          </Card>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold mb-4 px-2 dark:text-white">Eco Points Trend</h3>
        <Card className="h-64 p-2 dark:bg-gray-800">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:stroke-gray-700" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9CA3AF', fontSize: 12}}
                dy={10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                cursor={{ stroke: '#2ECC71', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="points" 
                stroke="#2ECC71" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorPoints)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-lg font-bold dark:text-white">Earned Badges</h3>
          <span className="text-xs font-bold text-primary">View All</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className={`flex flex-col items-center p-4 text-center ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}>
                <div className={`w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-2xl mb-2`}>
                  {badge.level}
                </div>
                <p className="text-[10px] font-bold text-text dark:text-white mb-1">{badge.title}</p>
                {badge.unlocked ? (
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp size={10} className="text-white" />
                  </div>
                ) : (
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded-full" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Card className="bg-zinc-900 dark:bg-black text-white p-6 rounded-[2rem]">
        <h4 className="font-bold mb-2">Did you know?</h4>
        <p className="text-sm text-gray-400 leading-relaxed">
          Switching to a bamboo toothbrush saves approximately 4 plastic toothbrushes from the ocean every year. Keep scanning!
        </p>
      </Card>
    </div>
  );
};

export default Progress;
