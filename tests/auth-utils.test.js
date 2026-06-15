import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeRole,
  getRolePermissions,
  hashPassword,
  verifyPassword,
} from '../src/auth/auth-utils.js';

test('normalizeRole convierte aliases de manager a gerente', () => {
  assert.equal(normalizeRole('Manager'), 'gerente');
  assert.equal(normalizeRole('CHEF'), 'chef');
  assert.equal(normalizeRole('Mesero'), 'mesero');
});

test('getRolePermissions devuelve los módulos permitidos por rol', () => {
  assert.deepEqual(getRolePermissions('gerente').modules, [
    'orders',
    'tables',
    'cart',
    'events',
    'reservations',
    'staff',
    'stock',
  ]);

  assert.deepEqual(getRolePermissions('chef').modules, ['orders']);
  assert.deepEqual(getRolePermissions('mesero').modules, ['orders', 'tables', 'cart']);
});

test('hashPassword y verifyPassword funcionan para la misma contraseña', async () => {
  const password = 'Password123!';
  const hashed = hashPassword(password);

  assert.notEqual(hashed, password);
  assert.equal(await verifyPassword(password, hashed), true);
  assert.equal(await verifyPassword('otra', hashed), false);
});
