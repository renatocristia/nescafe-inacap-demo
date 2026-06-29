import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: <CheckCircle2 size={18} style={{ color: 'var(--c-success)' }} />,
  error:   <AlertCircle  size={18} style={{ color: 'var(--c-danger)'  }} />,
  info:    <Info         size={18} style={{ color: 'var(--c-accent)'  }} />,
};

export default function FeedbackToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <div className="feedback-toast-wrap">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className={`feedback-toast ${toast.type}`}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{   opacity: 0, y: -10,  scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="toast-icon">{ICONS[toast.type]}</span>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-text-3)', display: 'flex', padding: 2 }}
            >
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
