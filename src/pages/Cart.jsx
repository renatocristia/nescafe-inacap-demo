import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Package, Truck } from 'lucide-react';

export default function Cart({ cart, sede, onUpdateQuantity, onRemoveItem, onConfirmOrder, onNavigate }) {
  const [deliveryType, setDeliveryType] = useState('retiro');
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const serviceFee = 0;

  if (cart.length === 0) {
    return (
      <div className="page-cart">
        <div className="cart-header"><h1>Carrito</h1></div>
        <div className="empty-state large">
          <div className="empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos desde el menú para comenzar</p>
          <button className="primary-btn" onClick={() => onNavigate('menu')}>Ver menú</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-cart">
      <div className="cart-header">
        <h1>Carrito</h1>
        <span className="cart-count">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
      </div>

      {/* Tipo de entrega */}
      <div className="delivery-type-selector">
        <button
          className={`delivery-type-btn ${deliveryType === 'retiro' ? 'active' : ''}`}
          onClick={() => setDeliveryType('retiro')}
        >
          <Package size={15} /> Retiro en caja
        </button>
        <button
          className={`delivery-type-btn ${deliveryType === 'despacho' ? 'active' : ''}`}
          onClick={() => setDeliveryType('despacho')}
        >
          <Truck size={15} /> Enviar a sala
        </button>
      </div>

      {/* Sede */}
      <div className="cart-sede">
        <MapPin size={18} />
        <div>
          <span className="cart-sede-label">{deliveryType === 'retiro' ? 'Retiro en' : 'Despacho desde'}</span>
          <span className="cart-sede-name">{sede?.name}</span>
        </div>
      </div>

      {/* Items */}
      <div className="cart-items">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="cart-item"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
            >
              <img src={item.image} alt={item.title} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <span className="cart-item-price">${item.price.toLocaleString('es-CL')} c/u</span>
                <div className="cart-item-controls">
                  <div className="quantity-control small">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Disminuir">
                      <Minus size={14} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= 99} aria-label="Aumentar">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button className="cart-item-remove" onClick={() => onRemoveItem(item.id)} aria-label="Eliminar">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="cart-item-subtotal">
                ${(item.price * item.quantity).toLocaleString('es-CL')}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="cart-footer">
        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Subtotal ({totalItems} productos)</span>
            <span>${subtotal.toLocaleString('es-CL')}</span>
          </div>
          <div className="cart-summary-row">
            <span>Costo de servicio</span>
            <span style={{ color: 'var(--c-success)', fontWeight: 700 }}>Gratis</span>
          </div>
          <div className="cart-summary-row total">
            <span>Total</span>
            <strong>${(subtotal + serviceFee).toLocaleString('es-CL')}</strong>
          </div>
        </div>
        <motion.button
          className="confirm-order-btn"
          onClick={onConfirmOrder}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingBag size={20} />
          Confirmar pedido · ${(subtotal + serviceFee).toLocaleString('es-CL')}
        </motion.button>
      </div>
    </div>
  );
}
