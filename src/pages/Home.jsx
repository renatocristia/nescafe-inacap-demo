import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Loader2, AlertCircle, MapPin, Clock, Flame, Star } from 'lucide-react';
import CategoryPill from '@/components/CategoryPill';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES } from '@/data/cafeData';

export default function Home({ products, loading, error, sede, onProductClick, onNavigateMenu, onCategorySelect, onRetry }) {
  const [search, setSearch] = useState('');

  const destacados = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 8),
    [products]
  );

  const masVendidos = useMemo(
    () => [...products].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 6),
    [products]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    onNavigateMenu(search);
  };

  const hora = new Date().getHours();
  const saludo = hora < 12 ? '¡Buenos días! ☀️' : hora < 19 ? '¡Buenas tardes! 🌤' : '¡Buenas noches! 🌙';

  return (
    <div className="page-home">
      {/* Hero */}
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1554118811-5e49e4ab8a5e?w=900&q=85"
          alt="Café INACAP"
          className="hero-bg"
        />
        <div className="hero-overlay" />

        {/* Top bar */}
        <div className="hero-top-bar">
          <div className="hero-sede-chip">
            <MapPin size={12} />
            {sede?.name?.replace('Sede ', '') || 'Sin sede'}
          </div>
          <div className="hero-time-chip">
            <Clock size={11} />
            Abierto ahora
          </div>
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="hero-greeting">{saludo}</p>
            <h1 className="hero-title">¿Qué te apetece<br />hoy?</h1>
            <div className="hero-cta-bar">
              <span className="hero-tag">🚀 Retiro rápido</span>
              <span className="hero-tag">🏠 Despacho a sala</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Buscador flotante */}
      <div className="home-search-wrap">
        <form onSubmit={handleSearch} className="home-search">
          <Search size={19} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar café, snacks, pasteles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={50}
          />
          <button type="submit" className="search-btn">Buscar</button>
        </form>
      </div>

      {/* Promo banner */}
      <motion.div
        className="promo-banner"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <div className="promo-banner-text">
          <h3>2x1 en bebidas calientes</h3>
          <p>Válido de lunes a viernes · 10:00 - 11:00 hrs</p>
        </div>
        <div className="promo-badge">
          2×1
          <span>HOY</span>
        </div>
      </motion.div>

      {/* Categorías */}
      <section className="home-section">
        <div className="section-header">
          <h2>Categorías</h2>
        </div>
        <div className="category-scroll">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              className="category-card"
              onClick={() => onCategorySelect(cat.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              <div className="category-card-icon">{cat.icon}</div>
              <span className="category-card-name">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="home-section">
        <div className="section-header">
          <h2>⭐ Mejor valorados</h2>
          <button className="section-link" onClick={onNavigateMenu}>
            Ver todo <ArrowRight size={15} />
          </button>
        </div>

        {loading && (
          <div className="loading-state">
            <Loader2 size={28} className="spin" />
            <p>Cargando productos...</p>
          </div>
        )}
        {error && !loading && (
          <div className="error-state">
            <AlertCircle size={28} />
            <p>{error}</p>
            <button className="retry-btn" onClick={onRetry}>Reintentar</button>
          </div>
        )}
        {!loading && !error && (
          <div className="destacados-scroll">
            {destacados.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
                variant="horizontal"
              />
            ))}
          </div>
        )}
      </section>

      {/* Más vendidos */}
      {!loading && !error && masVendidos.length > 0 && (
        <section className="home-section" style={{ paddingBottom: 24 }}>
          <div className="section-header">
            <h2>🔥 Más pedidos</h2>
            <button className="section-link" onClick={onNavigateMenu}>
              Ver todo <ArrowRight size={15} />
            </button>
          </div>
          <div className="destacados-scroll">
            {masVendidos.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
                variant="horizontal"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
