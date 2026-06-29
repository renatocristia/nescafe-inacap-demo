import { motion } from 'framer-motion';
import { Home, Coffee, ShoppingCart, ClipboardList } from 'lucide-react';

export default function BottomNav({ active, onChange, cartCount }) {
  const tabs = [
    { id: 'home',   label: 'Inicio',   Icon: Home },
    { id: 'menu',   label: 'Menú',     Icon: Coffee },
    { id: 'cart',   label: 'Carrito',  Icon: ShoppingCart, badge: cartCount },
    { id: 'orders', label: 'Pedidos',  Icon: ClipboardList },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(({ id, label, Icon, badge }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            className={`nav-tab ${isActive ? 'active' : ''}`}
            onClick={() => onChange(id)}
          >
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="nav-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="nav-tab-icon">
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              {badge > 0 && (
                <motion.span
                  key={badge}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="nav-badge"
                >
                  {badge > 99 ? '99+' : badge}
                </motion.span>
              )}
            </div>
            <span className="nav-tab-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
