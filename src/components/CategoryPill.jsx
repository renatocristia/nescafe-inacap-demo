/**
 * Pill/badge de categoría para filtros del menú y carrusel del Home.
 */
export default function CategoryPill({ category, active, onClick }) {
  return (
    <button
      className={`category-pill ${active ? 'active' : ''}`}
      onClick={() => onClick(category.id)}
    >
      <span className="category-pill-icon">{category.icon}</span>
      <span className="category-pill-label">{category.name}</span>
    </button>
  );
}