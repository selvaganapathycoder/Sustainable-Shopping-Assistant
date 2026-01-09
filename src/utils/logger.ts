/**
 * Professional Logger Utility
 * Provides stylized console output for different log levels.
 */

// Use a robust way to check for development environment across different bundlers/environments
const getEnv = () => {
  try {
    // @ts-ignore - Vite
    if (typeof import.meta !== 'undefined' && import.meta.env) return import.meta.env.DEV;
  } catch {}
  
  try {
    // @ts-ignore - Node/CRA/Next.js
    if (typeof process !== 'undefined' && process.env) return process.env.NODE_ENV === 'development';
  } catch {}

  return true; // Default to true if we can't determine
};

const IS_DEV = getEnv();

const styles = {
  info: 'color: #3b82f6; font-weight: bold; border-left: 4px solid #3b82f6; padding-left: 8px;',
  success: 'color: #10b981; font-weight: bold; border-left: 4px solid #10b981; padding-left: 8px;',
  warn: 'color: #f59e0b; font-weight: bold; border-left: 4px solid #f59e0b; padding-left: 8px;',
  error: 'color: #ef4444; font-weight: bold; border-left: 4px solid #ef4444; padding-left: 8px;',
  badge: (color: string) => `background: ${color}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 10px; margin-right: 8px;`
};

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (!IS_DEV) return;
    console.log(`%cINFO%c ${message}`, styles.badge('#3b82f6'), styles.info, ...args);
  },
  success: (message: string, ...args: unknown[]) => {
    if (!IS_DEV) return;
    console.log(`%cSUCCESS%c ${message}`, styles.badge('#10b981'), styles.success, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    if (!IS_DEV) return;
    console.warn(`%cWARN%c ${message}`, styles.badge('#f59e0b'), styles.warn, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    if (!IS_DEV) return;
    console.error(`%cERROR%c ${message}`, styles.badge('#ef4444'), styles.error, ...args);
  }
};

export default logger;
