import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, Package, Trash2, ChevronRight, ShoppingBag } from 'lucide-react';

const STATUS_CONFIG = {
  en_preparacion: { label: 'En preparación', icon: Clock, color: 'amber', step: 0 },
  listo:          { label: 'Listo para retirar', icon: Package, color: 'green', step: 1 },
  entregado:      { label: 'Entregado', icon: CheckCircle, color: 'gray', step: 2 },
};
const STATUS_ORDER = ['en_preparacion', 'listo', 'entregado'];
const STEP_LABELS = ['Preparando', 'Listo', 'Entregado'];

function OrderProgressBar({ currentStatus }) {
  const currentStep = STATUS_CONFIG[currentStatus]?.step ?? 0;
  return (
    <div className="order-progress-bar">
      {STEP_LABELS.map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < STEP_LABELS.length - 1 ? '1' : undefined }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={`order-progress-dot ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span className={`order-progress-label ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>{label}</span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className={`order-progress-line ${i < currentStep ? 'done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Orders({ orders, onUpdateStatus, onDeleteOrder, onNavigate }) {
  if (orders.length === 0) {
    return (
      <div className="page-orders">
        <div className="orders-header"><h1>Mis Pedidos</h1></div>
        <div className="empty-state large">
          <div className="empty-icon">📋</div>
          <h2>Sin pedidos aún</h2>
          <p>Cuando confirmes un pedido, podrás seguirlo aquí</p>
          <button className="primary-btn" onClick={() => onNavigate('menu')}>Hacer un pedido</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-orders">
      <div className="orders-header">
        <h1>Mis Pedidos</h1>
        <span className="orders-count">{orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}</span>
      </div>

      <div className="orders-list">
        <AnimatePresence>
          {orders.map((order) => {
            const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.en_preparacion;
            const StatusIcon = status.icon;
            const nextStatusIdx = STATUS_ORDER.indexOf(order.status) + 1;
            const canAdvance = nextStatusIdx < STATUS_ORDER.length;

            return (
              <motion.div
                key={order.id}
                className="order-card"
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.22 }}
              >
                <div className="order-card-header">
                  <div>
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">
                      {new Date(order.date).toLocaleDateString('es-CL', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <span className={`order-status ${status.color}`}>
                    <StatusIcon size={13} />
                    {status.label}
                  </span>
                </div>

                <OrderProgressBar currentStatus={order.status} />

                <div className="order-sede">
                  <ShoppingBag size={13} /> {order.sedeName}
                </div>

                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item-row">
                      <span className="order-item-qty">{item.quantity}×</span>
                      <span className="order-item-name">{item.title}</span>
                      <span className="order-item-price">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="order-total">
                    <span>Total del pedido</span>
                    <strong>${order.total.toLocaleString('es-CL')}</strong>
                  </div>
                  <div className="order-actions">
                    {canAdvance && (
                      <button
                        className="order-advance-btn"
                        onClick={() => onUpdateStatus(order.id, STATUS_ORDER[nextStatusIdx])}
                      >
                        {STATUS_CONFIG[STATUS_ORDER[nextStatusIdx]].label}
                        <ChevronRight size={14} />
                      </button>
                    )}
                    <button
                      className="order-delete-btn"
                      onClick={() => onDeleteOrder(order.id)}
                      aria-label="Eliminar pedido"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
