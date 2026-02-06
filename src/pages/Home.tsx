import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAppContext } from '../context/useAppContext';
import { mockProducts } from '../data/mockProducts';
import { Scan, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Scan as ScanType } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { points, history } = useAppContext();

  useEffect(() => {
    const onboarded = localStorage.getItem('ecoscan_onboarded');
    if (!onboarded) {
      navigate('/onboarding');
    }
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto h-full px-4">
      <Header subtitle="Let's shop sustainably" />

      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary dark:bg-primary/90 p-6 rounded-[2rem] text-white shadow-xl shadow-green-200 dark:shadow-green-900/50 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} className="text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-medium opacity-90">Eco Points Earned</span>
            </div>
            <div className="text-4xl font-extrabold mb-4">{points}</div>
            <div className="flex gap-4">
              <div className="bg-white/20 dark:bg-white/10 px-3 py-1.5 rounded-xl text-xs backdrop-blur-sm">
                🌱 1.2kg CO₂ Saved
              </div>
              <div className="bg-white/20 dark:bg-white/10 px-3 py-1.5 rounded-xl text-xs backdrop-blur-sm">
                ✅ 24 Items Scanned
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold mb-4 px-2 dark:text-white">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="flex flex-col items-center justify-center h-32 border-2 border-primary/10 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/40"
            onClick={() => navigate('/scan')}
          >
            <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-2">
              <Scan size={24} />
            </div>
            <span className="font-bold dark:text-white">Scan Product</span>
          </Card>
          <Card 
            className="flex flex-col items-center justify-center h-32 border-2 border-blue-50 dark:border-blue-900/30 hover:border-blue-100 dark:hover:border-blue-800/50"
            onClick={() => navigate('/progress')}
          >
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-2">
              <TrendingUp size={24} />
            </div>
            <span className="font-bold dark:text-white">My Progress</span>
          </Card>
        </div>
      </section>

      <section className="mb-4 pb-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-lg font-bold dark:text-white">Recent Scans</h3>
          <button 
            className="text-primary dark:text-primary text-sm font-semibold"
            onClick={() => navigate('/history')}
          >
            See All
          </button>
        </div>

        {history.length > 0 ? (
          <div className="space-y-4">
            {history.slice(0, 3).map((scan: ScanType) => {
              const product = scan.product || mockProducts[scan.productId];
              if (!product) return null;
              return (
                <Card key={scan.id} className="flex items-center gap-4 p-3 pr-4" onClick={() => navigate(`/product/${scan.productId}`)}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm line-clamp-1 dark:text-white">{product.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    product.grade === 'A' ? 'bg-green-500' : product.grade === 'B' ? 'bg-lime-500' : 'bg-yellow-500'
                  }`}>
                    {product.grade}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Scan size={32} />
            </div>
            <p className="text-sm">No products scanned yet</p>
            <Button variant="ghost" className="mt-2" onClick={() => navigate('/scan')}>
              Start Scanning
            </Button>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Home;
