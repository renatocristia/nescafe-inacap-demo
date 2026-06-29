import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Splash from '@/components/Splash';
import SedeSelector from '@/components/SedeSelector';
import BottomNav from '@/components/BottomNav';
import ProductDetailSheet from '@/components/ProductDetailSheet';
import FeedbackToast from '@/components/FeedbackToast';

import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Cart from '@/pages/Cart';
import Orders from '@/pages/Orders';

import { fetchProducts } from '@/api/fakestore';
import { mapToCafeProduct } from '@/data/cafeData';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Transición de pantalla completa (Splash -> Sede -> App principal).
// Fade + leve desplazamiento vertical, look "premium" tipo onboarding.
const SCREEN_TRANSITION = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
const screenVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

// Transición entre tabs (Inicio / Menú / Carrito / Pedidos).
// Fade puro y rápido, igual al cambio de pestañas de Uber Eats.
const TAB_TRANSITION = { duration: 0.18, ease: 'easeInOut' };
const tabVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

let toastSeq = 0;

/**
 * CafeApp — contenedor y "cerebro" de la aplicación.
 *
 * Todo el estado vive aquí, de forma centralizada (mismo patrón que un
 * App.js clásico): sede elegida, catálogo de productos, carrito, pedidos,
 * pantalla/tab activos, el sheet de detalle de producto y los toasts de
 * feedback. Las pantallas (Home, Menu, Cart, Orders, Splash, SedeSelector)
 * son componentes de presentación: reciben datos y callbacks por props y
 * no manejan persistencia ni lógica de negocio por sí mismas.
 *
 * Flujo de navegación:
 *   Splash (2.4s)
 *     -> si no hay sede guardada: SedeSelector
 *     -> si ya hay sede: directo al Inicio
 *   App principal con 4 tabs (Inicio | Menú | Carrito | Pedidos),
 *   con transición fade suave entre cada pantalla y cada tab.
 */
export default function CafeApp() {
  // ----- Sede seleccionada (persistida en Local Storage) -----
  const [sede, setSede] = useLocalStorage('cafe_inacap_sede', null);

  // ----- Pantalla actual: 'splash' | 'onboarding' | 'main' -----
  const [screen, setScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');

  // ----- Catálogo de productos (FakeStore API adaptada a temática café) -----
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----- Carrito y pedidos (persistidos en Local Storage) -----
  const [cart, setCart] = useLocalStorage('cafe_inacap_cart', []);
  const [orders, setOrders] = useLocalStorage('cafe_inacap_orders', []);

  // ----- Sheet de detalle de producto -----
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // ----- Filtros con los que se "siembra" el Menú al llegar desde el Inicio -----
  const [menuCategory, setMenuCategory] = useState('all');
  const [menuSearch, setMenuSearch] = useState('');

  // ----- Toast de feedback (éxito / error / info) -----
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    toastSeq += 1;
    setToast({ id: toastSeq, type, message });
  }, []);

  // ----- Carga del catálogo -----
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await fetchProducts();
      setProducts(raw.map(mapToCafeProduct));
    } catch (err) {
      setError(err.message || 'No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ----- Splash: al terminar, decide si pedir sede o ir directo al Inicio -----
  const handleSplashFinish = useCallback(() => {
    setScreen(sede ? 'main' : 'onboarding');
  }, [sede]);

  const handleSedeSelect = useCallback((selectedSede) => {
    setSede(selectedSede);
    setActiveTab('home');
    setScreen('main');
  }, [setSede]);

  // ----- Navegación entre tabs -----
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // Usado por los CTA de los estados vacíos (Carrito y Pedidos)
  const handleNavigate = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // Desde Home: buscador y "Ver todo" de Destacados
  const handleNavigateMenu = useCallback((query) => {
    setMenuSearch(typeof query === 'string' ? query : '');
    setMenuCategory('all');
    setActiveTab('menu');
  }, []);

  // Desde Home: click en una categoría
  const handleCategorySelect = useCallback((categoryId) => {
    setMenuCategory(categoryId);
    setMenuSearch('');
    setActiveTab('menu');
  }, []);

  // ----- Detalle de producto (bottom sheet) -----
  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
    setSheetOpen(true);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setSheetOpen(false);
  }, []);

  // ----- Carrito -----
  const handleAddToCart = useCallback((product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
            : item
        );
      }
      return [
        ...prev,
        { id: product.id, title: product.title, price: product.price, image: product.image, quantity },
      ];
    });
    showToast('success', `${product.title} agregado al carrito ☕`);
  }, [setCart, showToast]);

  const handleUpdateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }, [setCart]);

  const handleRemoveItem = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('info', 'Producto eliminado del carrito');
  }, [setCart, showToast]);

  // ----- Confirmar pedido: mueve el carrito a Mis Pedidos -----
  const handleConfirmOrder = useCallback(() => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      id: `#PED-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      sedeName: sede?.name || 'Sede no especificada',
      items: cart.map(({ title, price, quantity }) => ({ title, price, quantity })),
      total,
      status: 'en_preparacion',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setActiveTab('orders');
    showToast('success', '¡Pedido confirmado! Te avisaremos cuando esté listo.');
  }, [cart, sede, setOrders, setCart, showToast]);

  // ----- Historial de pedidos -----
  const handleUpdateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  }, [setOrders]);

  const handleDeleteOrder = useCallback((orderId) => {
    const confirmed = window.confirm('¿Eliminar este pedido del historial?');
    if (!confirmed) return;
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('info', 'Pedido eliminado del historial');
  }, [setOrders, showToast]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <Splash key="splash" onFinish={handleSplashFinish} />
        )}

        {screen === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={screenVariants.initial}
            animate={screenVariants.animate}
            exit={screenVariants.exit}
            transition={SCREEN_TRANSITION}
          >
            <SedeSelector onSelect={handleSedeSelect} />
          </motion.div>
        )}

        {screen === 'main' && (
          <motion.div
            key="main"
            initial={screenVariants.initial}
            animate={screenVariants.animate}
            exit={screenVariants.exit}
            transition={SCREEN_TRANSITION}
          >
            <div className="app-content">
              <AnimatePresence mode="wait">
                {activeTab === 'home' && (
                  <motion.div
                    key="home"
                    initial={tabVariants.initial}
                    animate={tabVariants.animate}
                    exit={tabVariants.exit}
                    transition={TAB_TRANSITION}
                  >
                    <Home
                      products={products}
                      loading={loading}
                      error={error}
                      sede={sede}
                      onProductClick={handleProductClick}
                      onNavigateMenu={handleNavigateMenu}
                      onCategorySelect={handleCategorySelect}
                      onRetry={loadProducts}
                    />
                  </motion.div>
                )}

                {activeTab === 'menu' && (
                  <motion.div
                    key="menu"
                    initial={tabVariants.initial}
                    animate={tabVariants.animate}
                    exit={tabVariants.exit}
                    transition={TAB_TRANSITION}
                  >
                    <Menu
                      products={products}
                      loading={loading}
                      error={error}
                      onProductClick={handleProductClick}
                      initialCategory={menuCategory}
                      initialSearch={menuSearch}
                      onRetry={loadProducts}
                    />
                  </motion.div>
                )}

                {activeTab === 'cart' && (
                  <motion.div
                    key="cart"
                    initial={tabVariants.initial}
                    animate={tabVariants.animate}
                    exit={tabVariants.exit}
                    transition={TAB_TRANSITION}
                  >
                    <Cart
                      cart={cart}
                      sede={sede}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                      onConfirmOrder={handleConfirmOrder}
                      onNavigate={handleNavigate}
                    />
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={tabVariants.initial}
                    animate={tabVariants.animate}
                    exit={tabVariants.exit}
                    transition={TAB_TRANSITION}
                  >
                    <Orders
                      orders={orders}
                      onUpdateStatus={handleUpdateOrderStatus}
                      onDeleteOrder={handleDeleteOrder}
                      onNavigate={handleNavigate}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <BottomNav active={activeTab} onChange={handleTabChange} cartCount={cartCount} />
          </motion.div>
        )}
      </AnimatePresence>

      <ProductDetailSheet
        product={selectedProduct}
        open={sheetOpen}
        onClose={handleCloseSheet}
        onAddToCart={handleAddToCart}
      />

      <FeedbackToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}