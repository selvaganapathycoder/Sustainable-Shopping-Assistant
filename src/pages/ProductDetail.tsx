import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts, alternatives } from '../data/mockProducts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { 
  ChevronLeft, 
  Share2, 
  Leaf, 
  Droplets, 
  Factory, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Info,
  ExternalLink,
  Award,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGradeColor, getImpactLabelClass } from '../utils/sustainability';

import { fetchProduct } from '../services/productService';
import { useAppContext } from '../context/useAppContext';
import type { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addScan } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchProduct(id);
      setProduct(data);
      if (data) {
        addScan(data.id, data);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id, addScan]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background dark:bg-gray-900">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
          <div className="absolute top-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" size={24} />
        </div>
        <p className="mt-6 text-text dark:text-white font-black tracking-tight uppercase text-xs">Analyzing Product Life Cycle...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center bg-background dark:bg-gray-900">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-[2rem] flex items-center justify-center mb-6">
          <XCircle size={40} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-text dark:text-white mb-2 tracking-tight">Product Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-[250px]">We couldn't find this product in our sustainability database yet.</p>
        <Button onClick={() => navigate('/scan')} size="lg" className="w-full max-w-xs">Scan Another Item</Button>
      </div>
    );
  }

  const altIds = alternatives[id || ''] || [];
  const recommendedAlts = altIds.map(aid => mockProducts[aid]).filter(Boolean);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-background dark:bg-gray-900 min-h-screen pb-32">
      {/* Header Image Section */}
      <div className="relative h-80 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
        <div className="absolute top-8 left-6 right-6 z-20 flex justify-between items-center text-white">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-white/90 dark:bg-gray-800/90 text-text dark:text-white rounded-2xl shadow-xl backdrop-blur-md active:scale-90 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white/90 dark:bg-gray-800/90 text-text dark:text-white rounded-2xl shadow-xl backdrop-blur-md active:scale-90 transition-transform">
              <Share2 size={20} />
            </button>
          </div>
        </div>
        
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-12 drop-shadow-2xl"
        />
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background dark:from-gray-900 to-transparent" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 -mt-8 relative z-20"
      >
        {/* Main Score Card */}
        <motion.div variants={itemVariants}>
          <Card className="mb-8 p-6 border-none shadow-2xl shadow-primary/5 dark:shadow-black/20">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">{product.brand}</span>
                  <CheckCircle2 size={12} className="text-primary" />
                </div>
                <h2 className="text-2xl font-black text-text dark:text-white leading-tight tracking-tight">{product.name}</h2>
              </div>
              <div className={`w-16 h-16 rounded-[1.5rem] flex flex-col items-center justify-center text-white shadow-lg ${getGradeColor(product.grade)} ring-4 ring-white dark:ring-gray-800`}>
                <span className="text-[10px] font-black opacity-60 leading-none">GRADE</span>
                <span className="text-3xl font-black leading-none mt-1">{product.grade}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                <span>Sustainability Score</span>
                <span className="text-primary">{product.score}%</span>
              </div>
              <div className="relative h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${product.score}%` }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute top-0 left-0 h-full ${getGradeColor(product.grade)} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                </motion.div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Award size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Impact</span>
                  <span className="text-xs font-black text-text dark:text-white uppercase leading-none">Positive</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                  <Zap size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Efficiency</span>
                  <span className="text-xs font-black text-text dark:text-white uppercase leading-none">Optimum</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Impact Analysis Details */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex items-center gap-2 mb-6 px-2">
            <h3 className="text-lg font-black text-text dark:text-white tracking-tight">Eco-Impact Matrix</h3>
            <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
            <Info size={16} className="text-gray-300" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="flex flex-col gap-3 p-5 border-none shadow-xl shadow-blue-500/5 bg-gradient-to-br from-white to-blue-50/20 dark:from-gray-800 dark:to-blue-900/5">
              <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                <Factory size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 leading-none">Carbon</span>
                <p className={`text-sm mt-1 leading-none ${getImpactLabelClass(product.impact.carbon, 'carbon')}`}>{product.impact.carbon}</p>
              </div>
              <div className="h-px bg-blue-500/10" />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold leading-tight">{product.details.carbonValue}</p>
            </Card>
            
            <Card className="flex flex-col gap-3 p-5 border-none shadow-xl shadow-teal-500/5 bg-gradient-to-br from-white to-teal-50/20 dark:from-gray-800 dark:to-teal-900/5">
              <div className="w-12 h-12 bg-teal-500/10 dark:bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-500">
                <Droplets size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 leading-none">Plastic</span>
                <p className={`text-sm mt-1 leading-none ${getImpactLabelClass(product.impact.plastic, 'plastic')}`}>{product.impact.plastic}</p>
              </div>
              <div className="h-px bg-teal-500/10" />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold leading-tight">{product.details.plasticValue}</p>
            </Card>

            <Card className="flex flex-col gap-3 p-5 border-none shadow-xl shadow-orange-500/5 bg-gradient-to-br from-white to-orange-50/20 dark:from-gray-800 dark:to-orange-900/5">
              <div className="w-12 h-12 bg-orange-500/10 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500">
                <Leaf size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 leading-none">Cycle</span>
                <p className={`text-sm mt-1 leading-none ${getImpactLabelClass(product.impact.recyclability, 'recyclability')}`}>{product.impact.recyclability}</p>
              </div>
              <div className="h-px bg-orange-500/10" />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold leading-tight">Eco-managed</p>
            </Card>

            <Card className="flex flex-col gap-3 p-5 border-none shadow-xl shadow-purple-500/5 bg-gradient-to-br from-white to-purple-50/20 dark:from-gray-800 dark:to-purple-900/5">
              <div className="w-12 h-12 bg-purple-500/10 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-500">
                <ShieldCheck size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 leading-none">Ethics</span>
                <p className={`text-sm mt-1 leading-none ${getImpactLabelClass(product.impact.ethics, 'ethics')}`}>{product.impact.ethics}</p>
              </div>
              <div className="h-px bg-purple-500/10" />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold leading-tight">{product.details.ethicsValue}</p>
            </Card>
          </div>
        </motion.div>

        {/* Verdict Banner */}
        <motion.div variants={itemVariants} className="mt-8 mb-10">
          <div className={`p-5 rounded-[2rem] flex items-center gap-5 ${
            product.score >= 70 ? 'bg-primary text-white' : 
            product.score >= 40 ? 'bg-orange-400 text-white' : 
            'bg-red-500 text-white'
          } shadow-2xl`}>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              {product.score >= 70 ? <CheckCircle2 size={30} /> : 
               product.score >= 40 ? <AlertTriangle size={30} /> : 
               <XCircle size={30} />}
            </div>
            <div className="flex-1">
              <h4 className="font-black leading-tight tracking-tight uppercase text-xs opacity-70 mb-1">The Verdict</h4>
              <p className="font-black text-lg leading-tight">
                {product.score >= 70 ? 'Excellent Sustainable Choice' : 
                 product.score >= 40 ? 'Fair Environmental Option' : 
                 'Better to Choose Alternatives'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Better Alternatives Section */}
        {recommendedAlts.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <div className="flex justify-between items-end mb-6 px-2">
              <div>
                <h3 className="text-xl font-black text-text dark:text-white tracking-tight">Eco-Switches</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Lower your footprint by 30%</p>
              </div>
              <ExternalLink size={18} className="text-primary" />
            </div>
            
            <div className="space-y-4">
              {recommendedAlts.map((alt) => (
                <Card 
                  key={alt.id} 
                  className="flex items-center gap-5 p-4 border-none shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer bg-white dark:bg-gray-800"
                  onClick={() => navigate(`/product/${alt.id}`)}
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-700 p-3 ring-1 ring-gray-100 dark:ring-gray-600">
                    <img src={alt.image} alt={alt.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{alt.brand}</span>
                    <h4 className="font-black text-md leading-tight mt-1 text-text dark:text-white">{alt.name}</h4>
                    <div className="flex items-center gap-3 mt-3">
                      <div className={`px-2 py-0.5 rounded-md flex items-center justify-center text-white text-[10px] font-black ${getGradeColor(alt.grade)}`}>
                        {alt.grade}
                      </div>
                      <div className="h-1 w-1 rounded-full bg-gray-300" />
                      <span className="text-[10px] text-primary font-black uppercase tracking-wider">Switch & Save CO₂</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>

      {/* Floating Action Button for Scan */}
      <div className="fixed bottom-32 left-0 right-0 px-6 z-50 pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="max-w-md mx-auto pointer-events-auto"
        >
          <Button 
            onClick={() => navigate('/scan')} 
            size="lg" 
            className="w-full shadow-2xl shadow-primary/40 rounded-3xl py-5"
          >
            Scan Next Item
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;

