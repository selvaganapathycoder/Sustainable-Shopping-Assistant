import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAppContext } from '../context/useAppContext';
import { mockProducts } from '../data/mockProducts';
import { Search, Calendar, SlidersHorizontal, Trash2 } from 'lucide-react';
import { getGradeColor } from '../utils/sustainability';

const History: React.FC = () => {
  const navigate = useNavigate();
  const { history, clearHistory } = useAppContext();
  const [search, setSearch] = useState('');

  const filteredHistory = history.filter(scan => {
    const product = scan.product || mockProducts[scan.productId];
    return product?.name.toLowerCase().includes(search.toLowerCase()) || 
           product?.brand.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="max-w-md mx-auto h-full px-4 pb-12">
      <Header title="Scan History" showAvatar={false} />

      <div className="flex gap-2 mb-6 px-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search scans..." 
            className="w-full bg-white dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-3 rounded-xl shadow-sm text-gray-500 dark:text-gray-400">
          <SlidersHorizontal size={20} />
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 px-2">
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{filteredHistory.length} Products Found</p>
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="text-red-500 dark:text-red-400 text-xs font-bold flex items-center gap-1"
          >
            <Trash2 size={14} /> Clear All
          </button>
        )}
      </div>

      {filteredHistory.length > 0 ? (
        <div className="space-y-4">
          {filteredHistory.map((scan) => {
            const product = scan.product || mockProducts[scan.productId];
            if (!product) return null;
            const date = new Date(scan.timestamp).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            });

            return (
              <Card 
                key={scan.id} 
                className="flex items-center gap-4 p-3 pr-4" 
                onClick={() => navigate(`/product/${scan.productId}`)}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-gray-700 p-2 border border-gray-100 dark:border-gray-600 shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate dark:text-white">{product.name}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">{product.brand}</p>
                  <div className="flex items-center gap-1 mt-1 text-gray-400 dark:text-gray-500">
                    <Calendar size={12} />
                    <span className="text-[10px] font-medium">{date}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0 ${getGradeColor(product.grade)}`}>
                  {product.grade}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-gray-500">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 opacity-50">
            <Search size={40} />
          </div>
          <p className="text-sm font-medium">No scan results found</p>
          {search && (
            <Button variant="ghost" className="mt-2" onClick={() => setSearch('')}>
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
