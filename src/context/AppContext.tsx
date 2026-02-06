import React, { useState, useEffect, useCallback } from 'react';
import type { Scan, UserPreferences, Product } from '../types';
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

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('ecoscan_preferences');
    return saved ? JSON.parse(saved) : {
      darkMode: false,
      notifications: true,
      emailNotifications: false,
      name: 'Alex Johnson',
      email: 'alex.eco@example.com'
    };
  });

  useEffect(() => {
    localStorage.setItem('ecoscan_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('ecoscan_points', points.toString());
    logger.info(`Points updated to: ${points}`);
  }, [points]);

  useEffect(() => {
    localStorage.setItem('ecoscan_preferences', JSON.stringify(preferences));
    // Apply dark mode to document
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    logger.info('Preferences updated', preferences);
  }, [preferences]);

  const addScan = useCallback((productId: string, productData?: Product) => {
    logger.success(`Adding new scan: ${productId}`);
    const newScan: Scan = {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      timestamp: new Date().toISOString(),
      product: productData ? {
        name: productData.name,
        brand: productData.brand,
        image: productData.image,
        grade: productData.grade,
        score: productData.score
      } : undefined
    };
    setHistory(prev => {
      // Avoid duplicate recent scans of same product
      if (prev.length > 0 && prev[0].productId === productId) {
        // If we now have product data but the existing entry doesn't, we should update it
        if (productData && !prev[0].product) {
          const updatedHistory = [...prev];
          updatedHistory[0] = { ...updatedHistory[0], product: newScan.product };
          return updatedHistory;
        }
        return prev;
      }
      return [newScan, ...prev];
    });
    setPoints(prev => prev + 10); // Simple point reward
  }, []);

  const clearHistory = useCallback(() => {
    logger.warn('Clearing scanning history and points');
    setHistory([]);
    setPoints(0);
  }, []);

  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    logger.info('Updating preferences', newPreferences);
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    logger.info('Toggling dark mode');
    setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  return (
    <AppContext.Provider value={{ 
      history, 
      points, 
      preferences,
      addScan, 
      clearHistory,
      updatePreferences,
      toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};
