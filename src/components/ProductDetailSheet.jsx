import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCategoryById } from '@/data/cafeData';

/**
 * Bottom Sheet (con Vaul) que muestra el detalle de un producto.
 * Permite seleccionar cantidad y agregar al carrito.
 */
export default function ProductDetailSheet({ product, open, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  // Resetear cantidad al abrir con un nuevo producto
  useEffect(() => {
    if (open) setQuantity(1);
  }, [open, product?.id]);

  if (!product) return null;

  const category = getCategoryById(product.category);
  const total = (product.price * quantity).toFixed(0);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <Drawer.Portal>
        <Drawer.Overlay className="vaul-overlay" />
        <Drawer.Content className="vaul-content">
          <div className="vaul-handle" />
          <div className="sheet-inner">
            <div className="sheet-image">
              <img src={product.image} alt={product.title} />
              {category && (
                <span className="sheet-category">
                  {category.icon} {category.name}
                </span>
              )}
            </div>

            <div className="sheet-body">
              <div className="sheet-header">
                <h2>{product.title}</h2>
                {product.rating > 0 && (
                  <span className="sheet-rating">
                    <Star size={15} fill="currentColor" /> {product.rating.toFixed(1)}
                    <span className="sheet-rating-count">({product.ratingCount} reseñas)</span>
                  </span>
                )}
              </div>

              <p className="sheet-description">{product.description}</p>

              <div className="sheet-quantity">
                <span className="sheet-quantity-label">Cantidad</span>
                <div className="quantity-control">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    disabled={quantity >= 99}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="sheet-footer">
              <div className="sheet-total">
                <span>Total</span>
                <strong>${parseInt(total).toLocaleString('es-CL')}</strong>
              </div>
              <motion.button
                className="sheet-add-btn"
                onClick={handleAdd}
                whileTap={{ scale: 0.97 }}
              >
                <ShoppingBag size={20} />
                Agregar al carrito
              </motion.button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  );
}