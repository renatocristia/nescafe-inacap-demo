// Cliente de FakeStore API con manejo de errores robusto.
// Endpoint: https://fakestoreapi.com/products

const API_URL = 'https://fakestoreapi.com/products';

/**
 * Obtiene la lista de productos desde FakeStore API.
 * Incluye validación de respuesta HTTP y formato de datos.
 * @returns {Promise<Array>} Lista de productos
 * @throws {Error} Con mensaje descriptivo para feedback al usuario
 */
export async function fetchProducts() {
  let response;
  try {
    response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
  } catch (networkError) {
    // Error de red (sin conexión, DNS, CORS, etc.)
    throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet e inténtalo nuevamente.');
  }

  // Validar código de estado HTTP
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error(`Error del servidor (${response.status}). Intenta nuevamente en unos momentos.`);
    }
    if (response.status === 404) {
      throw new Error('El recurso solicitado no fue encontrado (404).');
    }
    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    throw new Error('La respuesta del servidor no es un JSON válido.');
  }

  // Validar integridad de los datos
  if (!Array.isArray(data)) {
    throw new Error('Formato de datos inesperado: se esperaba una lista de productos.');
  }
  if (data.length === 0) {
    throw new Error('No hay productos disponibles en este momento.');
  }

  return data;
}