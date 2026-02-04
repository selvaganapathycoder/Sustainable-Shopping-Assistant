import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts, alternatives } from '../data/mockProducts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { ChevronLeft, Share2, Leaf, Droplets, Factory, ShieldCheck, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getGradeColor, getImpactLabelClass } from '../utils/sustainability';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = mockProducts[id || ''];

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center dark:text-white">
        <XCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">We couldn't find the product you scanned in our database.</p>
        <Button onClick={() => navigate('/scan')}>Try Scanning Again</Button>
      </div>
    );
  }

  const altIds = alternatives[id || ''] || [];
  const recommendedAlts = altIds.map(aid => mockProducts[aid]).filter(Boolean);

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="relative h-72 bg-white dark:bg-gray-800">
        <div className="absolute top-6 left-6 z-10">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/80 dark:bg-gray-800/80 dark:text-white rounded-full shadow-md backdrop-blur-sm">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-6 right-6 z-10">
          <button className="p-2 bg-white/80 dark:bg-gray-800/80 dark:text-white rounded-full shadow-md backdrop-blur-sm">
            <Share2 size={24} />
          </button>
        </div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-8"
        />
      </div>

      <div className="px-6 -mt-10 relative z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="mb-6 p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-primary font-bold text-sm uppercase tracking-wider">{product.brand}</p>
                <h2 className="text-2xl font-extrabold text-text dark:text-white">{product.name}</h2>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg ${getGradeColor(product.grade)}`}>
                {product.grade}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${product.score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${getGradeColor(product.grade)}`}
                />
              </div>
              <span className="text-sm font-bold text-gray-400 dark:text-gray-500">{product.score}/100</span>
            </div>

            <div className="mt-6 flex gap-4">
              {product.score >= 70 ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-xl flex-1 justify-center font-bold text-sm">
                  <CheckCircle2 size={18} /> Recommended
                </div>
              ) : product.score >= 40 ? (
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-2 rounded-xl flex-1 justify-center font-bold text-sm">
                  <AlertTriangle size={18} /> Moderate Choice
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded-xl flex-1 justify-center font-bold text-sm">
                  <XCircle size={18} /> Better Avoid
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        <h3 className="text-lg font-bold mb-4 px-2 dark:text-white">Sustainability Impact</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2 text-blue-500">
              <Factory size={18} />
              <span className="text-xs font-bold uppercase tracking-tight">Carbon</span>
            </div>
            <p className={`text-sm ${getImpactLabelClass(product.impact.carbon)}`}>{product.impact.carbon}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{product.details.carbonValue}</p>
          </Card>
          
          <Card className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2 text-teal-500">
              <Droplets size={18} />
              <span className="text-xs font-bold uppercase tracking-tight">Plastic</span>
            </div>
            <p className={`text-sm ${getImpactLabelClass(product.impact.plastic)}`}>{product.impact.plastic}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{product.details.plasticValue}</p>
          </Card>

          <Card className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2 text-orange-500">
              <Leaf size={18} />
              <span className="text-xs font-bold uppercase tracking-tight">Recycling</span>
            </div>
            <p className={`text-sm ${getImpactLabelClass(product.impact.recyclability)}`}>{product.impact.recyclability}</p>
          </Card>

          <Card className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2 text-green-600">
              <ShieldCheck size={18} />
              <span className="text-xs font-bold uppercase tracking-tight">Ethics</span>
            </div>
            <p className={`text-sm ${getImpactLabelClass(product.impact.ethics)}`}>{product.impact.ethics}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{product.details.ethicsValue}</p>
          </Card>
        </div>

        {recommendedAlts.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-lg font-bold dark:text-white">Better Alternatives</h3>
              <Badge variant="success">Recommended for you</Badge>
            </div>
            <div className="space-y-4">
              {recommendedAlts.map((alt) => (
                <Card 
                  key={alt.id} 
                  className="flex items-center gap-4 border-2 border-primary/20 bg-green-50/30 dark:bg-green-900/20"
                  onClick={() => navigate(`/product/${alt.id}`)}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-gray-700 p-2">
                    <img src={alt.image} alt={alt.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm leading-tight mb-1 dark:text-white">{alt.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold ${getGradeColor(alt.grade)}`}>
                        {alt.grade}
                      </div>
                      <span className="text-[10px] text-primary font-bold uppercase">Switch for 30% less CO₂</span>
                    </div>
                  </div>
                  <ChevronLeft className="rotate-180 text-gray-300 dark:text-gray-600 mr-2" />
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
