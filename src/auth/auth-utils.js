import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const ROLE_ALIASES = {
  gerente: 'gerente',
  manager: 'gerente',
  'gerente-general': 'gerente',
  chef: 'chef',
  cocinero: 'chef',
  mesero: 'mesero',
  waiter: 'mesero',
  camarero: 'mesero',
};

export const ROLE_DEFINITIONS = {
  gerente: {
    label: 'Gerente',
    modules: ['orders', 'tables', 'cart', 'events', 'reservations', 'staff', 'stock'],
    views: ['pedidos', 'mesas', 'carrito', 'eventos', 'reservaciones', 'personal', 'stock'],
  },
  chef: {
    label: 'Chef',
    modules: ['orders'],
    views: ['pedidos'],
  },
  mesero: {
    label: 'Mesero',
    modules: ['orders', 'tables', 'cart'],
    views: ['pedidos', 'mesas', 'carrito'],
  },
};

export const DEMO_USERS = [
  {
    id: 'demo-gerente',
    name: 'Gerente Demo',
    email: 'gerente@papaluigi.com',
    password: 'Gerente123!',
    role: 'gerente',
  },
  {
    id: 'demo-chef',
    name: 'Chef Demo',
    email: 'chef@papaluigi.com',
    password: 'Chef123!',
    role: 'chef',
  },
  {
    id: 'demo-mesero',
    name: 'Mesero Demo',
    email: 'mesero@papaluigi.com',
    password: 'Mesero123!',
    role: 'mesero',
  },
];

export const normalizeRole = (role = '') => {
  const normalized = String(role).trim().toLowerCase();
  return ROLE_ALIASES[normalized] || normalized || 'mesero';
};

export const getRolePermissions = (role = '') => {
  const normalizedRole = normalizeRole(role);
  return {
    role: normalizedRole,
    label: ROLE_DEFINITIONS[normalizedRole]?.label || 'Usuario',
    modules: ROLE_DEFINITIONS[normalizedRole]?.modules || [],
    views: ROLE_DEFINITIONS[normalizedRole]?.views || [],
  };
};

export const hashPassword = (password) => {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
};

export const verifyPassword = async (password, storedHash) => {
  const [salt, key] = String(storedHash).split(':');

  if (!salt || !key) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, 64);
  const expectedKey = Buffer.from(key, 'hex');

  return timingSafeEqual(derivedKey, expectedKey);
};
