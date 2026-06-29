import { useState, useMemo } from 'react';
import { Search, Loader2, AlertCircle, X, SlidersHorizontal } from 'lucide-react';
import CategoryPill from '@/components/CategoryPill';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES } from '@/data/cafeData';
import { motion } from 'framer-motion';

export default function Menu({ products, loading, error, onProductClick, initialCategory, initialSearch, onRetry }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');
  const [search, setSearch] = useState(initialSearch || '');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, activeCategory, search, sortBy]);

  return (
    <div className="page-menu">
      <div className="menu-header-sticky">
        <div className="menu-title-row">
          <h1>Menú</h1>
          {!loading && !error && (
            <span className="menu-count-badge">{filtered.length} productos</span>
          )}
        </div>

        {/* Buscador */}
        <div className="menu-search-wrap">
          <div className="menu-search">
            <Search size={17} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              maxLength={50}
            />
            {search && (
              <button onClick={() => setSearch('')} className="search-clear" aria-label="Limpiar">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="category-filters">
          <CategoryPill
            category={{ id: 'all', name: 'Todos', icon: '🍽️' }}
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          />
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              category={cat}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Sort bar */}
      <div style={{ padding: '12px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <SlidersHorizontal size={14} style={{ color: 'var(--c-text-3)' }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-text-3)', marginRight: 4 }}>Ordenar:</span>
        {[['default', 'Relevancia'], ['rating', '⭐ Rating'], ['price-asc', 'Precio ↑'], ['price-desc', 'Precio ↓']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setSortBy(val)}
            style={{
              padding: '4px 10px', borderRadius: 'var(--r-full)',
              border: '1.5px solid',
              borderColor: sortBy === val ? 'var(--c-primary)' : 'var(--c-border)',
              background: sortBy === val ? 'var(--c-primary)' : '#fff',
              color: sortBy === val ? '#fff' : 'var(--c-text-2)',
              fontSize: 12, fontWeight: 700, fontFamily: 'var(--font)',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="menu-grid-wrap">
        {loading && (
          <div className="loading-state">
            <Loader2 size={32} className="spin" />
            <p>Cargando productos...</p>
          </div>
        )}
        {error && !loading && (
          <div className="error-state">
            <AlertCircle size={32} />
            <p>{error}</p>
            <button className="retry-btn" onClick={onRetry}>Reintentar</button>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <p>🔍 Sin resultados</p>
            <span>Prueba con otra búsqueda</span>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <motion.div className="menu-grid" layout>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <ProductCard product={product} onClick={onProductClick} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
