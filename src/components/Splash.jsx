import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="splash-bg-pattern" />
      <div className="splash-inner">
        <motion.div
          className="splash-logo-wrap"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/inacafe.png" alt="INACAPcafé" className="splash-logo-img" />
        </motion.div>
        <motion.h1
          className="splash-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          INACAP<span>café</span>
        </motion.h1>
        <motion.p
          className="splash-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          Tu cafetería universitaria, en tu bolsillo
        </motion.p>
      </div>
      <div className="splash-loader" />
    </motion.div>
  );
}
