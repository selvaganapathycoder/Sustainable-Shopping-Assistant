import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useAppContext } from '../context/useAppContext';
import { X, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { logger } from '../utils/logger';

const BarcodeScanner: React.FC = () => {
  const navigate = useNavigate();
  const { addScan } = useAppContext();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
          const qrboxSize = Math.floor(minEdge * 0.7);
          return {
            width: qrboxSize,
            height: Math.floor(qrboxSize * 0.6)
          };
        },
        rememberLastUsedCamera: true,
        aspectRatio: 1.0
      },
      /* verbose= */ false
    );

    const onScanSuccess = (decodedText: string) => {
      logger.success(`Code matched = ${decodedText}`);
      // Navigate directly - let the ProductDetail page handle "Loading" and "Not Found"
      scannerRef.current?.clear();
      navigate(`/product/${decodedText}`);
    };

    const onScanFailure = () => {
      // console.warn(`Code scan error = ${error}`);
    };

    scannerRef.current.render(onScanSuccess, onScanFailure);

    return () => {
      scannerRef.current?.clear().catch(err => logger.error("Failed to clear scanner", err));
    };
  }, [navigate, addScan]);

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="absolute top-0 left-0 right-0 z-20 bg-linear-to-b from-black/80 to-transparent p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full backdrop-blur-md">
          <X size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Camera size={20} className="text-primary" />
          <span className="font-bold">Barcode Scanner</span>
        </div>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div id="reader" className="w-full h-full max-w-md overflow-hidden"></div>
        
        {/* Mock UI overlay for scanner since real camera might not work in all environments */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
          <div className="w-[70vw] max-w-[280px] aspect-[1.6/1] border-2 border-primary rounded-2xl relative shadow-[0_0_0_1000px_rgba(0,0,0,0.5)]">
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#2ECC71]"
            />
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
          </div>
          <p className="mt-8 text-white/80 text-xs font-bold bg-black/40 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10 uppercase tracking-wider">
            Align barcode inside the frame
          </p>
        </div>


      </div>

      <div className="p-6 bg-zinc-900 border-t border-white/5 pb-24">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Test</h4>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              addScan("8901234567890");
              navigate("/product/8901234567890");
            }}
            className="flex-1 bg-white/10 py-3 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors"
          >
            Mock "Green" Scan
          </button>
          <button 
            onClick={() => {
              addScan("8901111222333");
              navigate("/product/8901111222333");
            }}
            className="flex-1 bg-white/10 py-3 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors"
          >
            Mock "Bad" Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
