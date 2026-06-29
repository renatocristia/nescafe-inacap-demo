// Categorías del menú de cafetería
export const CATEGORIES = [
  { id: 'bebidas-calientes', name: 'Bebidas Calientes', icon: '☕', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80' },
  { id: 'pasteles', name: 'Pasteles', icon: '🍰', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
  { id: 'snacks', name: 'Snacks', icon: '🥪', image: 'https://images.unsplash.com/photo-1528735602756-3bb302c46826?w=400&q=80' },
  { id: 'bebidas-frias', name: 'Bebidas Frías', icon: '🥤', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe9b5a24?w=400&q=80' },
];

// Mapeo de categorías de FakeStore API a categorías de cafetería
/** @typedef {'bebidas-calientes'|'pasteles'|'snacks'|'bebidas-frias'} CafeCategory */
/** @type {Record<'electronics'|'jewelery'|"men's clothing"|"women's clothing", CafeCategory>} */
const CATEGORY_MAP = {
  'electronics': 'bebidas-calientes',
  'jewelery': 'pasteles',
  "men's clothing": 'snacks',
  "women's clothing": 'bebidas-frias',
};

// Imágenes de café (Unsplash) por categoría — para coherencia visual del tema cafetería
/** @type {Record<CafeCategory, string[]>} */
const CAFE_IMAGES = {
  'bebidas-calientes': [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce740b57?w=600&q=80',
    'capu.png',
    'moka.png',
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&q=80',
    'https://images.unsplash.com/photo-1442975631115-c4f8b056093e?w=600&q=80',
    'https://images.unsplash.com/photo-1510707577718-ae3a0af4539e?w=600&q=80',
  ],
  'pasteles': [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
    'https://images.unsplash.com/photo-1488477181946-6428a0a177d8?w=600&q=80',
    'https://images.unsplash.com/photo-1464195244685-9b6ba7c9f4e1?w=600&q=80',
    'https://images.unsplash.com/photo-1505250469679-203ad9ced02d?w=600&q=80',
    'https://images.unsplash.com/photo-1551024601-bec78aea617d?w=600&q=80',
    'https://images.unsplash.com/photo-1535141192574-5d4893c5e4ad?w=600&q=80',
    'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80',
  ],
  'snacks': [
    'https://images.unsplash.com/photo-1528735602756-3bb302c46826?w=600&q=80',
    'https://images.unsplash.com/photo-1521305916504-4a3e7f8c2de0?w=600&q=80',
    'smooth.png',
    'https://images.unsplash.com/photo-1559054663-e8d23213f5c7?w=600&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7eaa4?w=600&q=80',
    'https://images.unsplash.com/photo-1481070414801-51b79994d8e9?w=600&q=80',
    'https://images.unsplash.com/photo-1523987355523-c7b52b61b973?w=600&q=80',
    'https://images.unsplash.com/photo-1513104890138-7c7496592de9?w=600&q=80',
  ],
  'bebidas-frias': [
    'rich.png',
    'https://images.unsplash.com/photo-1497935586351-ba1877254572?w=600&q=80',
    'https://images.unsplash.com/photo-1514362545857-3bc0c6adca6c?w=600&q=80',
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    'https://images.unsplash.com/photo-1485808191679-5f8d683d0e4d?w=600&q=80',
    'https://images.unsplash.com/photo-1544145946-fb1e6c3e8e5d?w=600&q=80',
    'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&q=80',
    'https://images.unsplash.com/photo-1571934841351-2b58b6e0a6b3?w=600&q=80',
  ],
};

// Nombres de productos de cafetería para adaptar los datos de la API al dominio
const CAFE_NAMES = {
  'bebidas-calientes': ['Espresso Doble', 'Cappuccino Clásico', 'Capuchino', 'Mocaccino', 'Americano', 'Flat White', 'Café Cortado', 'Carajillo'],
  'pasteles': ['Cheesecake Frutos Rojos', 'Torta Selva Negra', 'Muffin de Arándanos', 'Croissant de Chocolate', 'Kuchen de Manzana', 'Brownie con Nuez', 'Tarta de Limón', 'Cupcake Red Velvet'],
  'snacks': ['Sándwich de Pavo', 'Empanada de Pino', 'Smooth Vainilla', 'Sándwich Italiano', 'Rolls de Canela', 'Pan de Queso', 'Sándwich de Atún', 'Wrap Vegetariano'],
  'bebidas-frias': ['Rich Caramel', 'Limonada de Menta', 'Iced Latte', 'Jugo Natural', 'Smoothie de Frutilla', 'Limonada de Jengibre', 'Cold Brew', 'Bebida de Cacao Fría'],
};

const CAFE_DESCRIPTIONS = {
  'bebidas-calientes': 'Preparado con granos 100% arábica de tueste medio. Nuestro barista lo elabora al momento para garantizar frescura y aroma intenso.',
  'pasteles': 'Hecho fresco cada mañana en nuestra pastelería. Ingredientes de calidad y recetas caseras que no defraudan.',
  'snacks': 'Opción ideal para un break entre clases. Preparado al momento con ingredientes frescos.',
  'bebidas-frias': 'Refrescante y perfecto para días calurosos. Preparado con fruta fresca de temporada.',
};

/**
 * Transforma un producto de FakeStore API al formato de cafetería.
 * Conserva id, price y rating de la API; adapta título, imagen y descripción
 * al dominio de cafetería para una experiencia de usuario coherente.
 * @param {{ id: number, category: 'electronics' | 'jewelery' | "men's clothing" | "women's clothing", price: number, rating?: { rate: number, count: number } }} product
 */
export function mapToCafeProduct(product) {
  const cafeCategory = CATEGORY_MAP[product.category] || 'snacks';
  const images = CAFE_IMAGES[cafeCategory];
  const names = CAFE_NAMES[cafeCategory];
  const idx = (product.id - 1) % images.length;

  return {
    id: product.id,
    title: names[idx],
    price: Math.round(product.price * 100) / 100,
    image: images[idx],
    category: cafeCategory,
    description: CAFE_DESCRIPTIONS[cafeCategory],
    rating: product.rating?.rate || 0,
    ratingCount: product.rating?.count || 0,
  };
}

/** @param {CafeCategory} id */
export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id);
}