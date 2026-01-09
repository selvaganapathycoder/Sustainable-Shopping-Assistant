import React, { useState, useEffect } from 'react';
import type { Scan } from '../types';
import { AppContext } from './AppContextCore';
import { logger } from '../utils/logger';


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<Scan[]>(() => {
    const saved = localStorage.getItem('ecoscan_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('ecoscan_points');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('ecoscan_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('ecoscan_points', points.toString());
    logger.info(`Points updated to: ${points}`);
  }, [points]);

  const addScan = (productId: string) => {
    logger.success(`Adding new scan: ${productId}`);
    const newScan: Scan = {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      timestamp: new Date().toISOString(),
    };
    setHistory(prev => [newScan, ...prev]);
    setPoints(prev => prev + 10); // Simple point reward
  };

  const clearHistory = () => {
    logger.warn('Clearing scanning history and points');
    setHistory([]);
    setPoints(0);
  };

  return (
    <AppContext.Provider value={{ history, points, addScan, clearHistory }}>
      {children}
    </AppContext.Provider>
  );
};
