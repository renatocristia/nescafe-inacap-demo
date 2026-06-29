import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Clock } from 'lucide-react';
import { SEDES } from '@/data/sedes';

export default function SedeSelector({ onSelect }) {
  return (
    <div className="sede-selector">
      <div className="sede-header">
        <div className="sede-bg-pattern" />
        <motion.div
          className="sede-step-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <span className="sede-step-dot active" />
          <span className="sede-step-dot" />
          <span className="sede-step-label">Paso 1 de 2</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="sede-logo-wrap"
        >
          <img src="/inacafe.png" alt="INACAPcafé" className="sede-logo-img" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="sede-title"
        >
          ¿Dónde estudias?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="sede-subtitle"
        >
          Elige tu sede para ver el menú disponible
        </motion.p>
      </div>

      <div className="sede-content">
        <motion.div 
          className="sede-section-header"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <span className="sede-section-label">Sedes disponibles</span>
          <span className="sede-section-count">{SEDES.length} campus</span>
        </motion.div>

        <div className="sede-list">
          {SEDES.map((sede, i) => (
            <motion.button
              key={sede.id}
              type="button"
              className="sede-card"
              onClick={() => onSelect(sede)}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.35 + i * 0.06, 
                duration: 0.45, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <div className="sede-icon">
                <MapPin size={22} strokeWidth={2.5} />
              </div>
              <div className="sede-info">
                <h3>{sede.name}</h3>
                <p className="sede-address">{sede.address}</p>
                <div className="sede-hours-badge">
                  <Clock size={12} strokeWidth={2.5} />
                  <span>Horario: {sede.hours}</span>
                </div>
              </div>
              <div className="sede-arrow">
                <ChevronRight size={20} strokeWidth={2.5} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}