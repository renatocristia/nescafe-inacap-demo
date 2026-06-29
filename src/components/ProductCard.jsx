import { motion } from 'framer-motion';
import { Star, Plus, Flame } from 'lucide-react';

export default function ProductCard({ product, onClick, variant = 'grid' }) {
  const isPopular = product.ratingCount > 300;
  return (
    <motion.button
      className={`product-card ${variant}`}
      onClick={() => onClick(product)}
      whileTap={{ scale: 0.97 }}
    >
      <div className="product-card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
        {isPopular && (
          <span className="product-card-badge">
            🔥 Popular
          </span>
        )}
        <span className="product-card-price">
          ${product.price.toLocaleString('es-CL')}
        </span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-meta">
          {product.rating > 0 && (
            <span className="product-card-rating">
              <Star size={12} fill="currentColor" /> {product.rating.toFixed(1)}
            </span>
          )}
          <span className="product-card-add">
            <Plus size={15} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
