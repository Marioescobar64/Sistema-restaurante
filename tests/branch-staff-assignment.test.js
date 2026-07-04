import test from 'node:test';
import assert from 'node:assert/strict';

import { assignStaffToBranchService } from '../src/branch/controller-branch.js';

test('assignStaffToBranchService asigna usuarios de personal válidos por rol a una sucursal', async () => {
  let updatePayload;

  const BranchModel = {
    findById: () => ({
      select: async () => ({ assignedStaff: [] }),
    }),
    findOne: async () => null,
    findByIdAndUpdate: async (_id, update) => {
      updatePayload = update;
      return { _id, assignedStaff: [{ user: 'user-1', role: 'CHEF_ROLE' }] };
    },
  };

  const UserModel = {
    find: async () => [{ _id: 'user-1', rol: 'CHEF_ROLE', isActive: true }],
  };

  const branch = await assignStaffToBranchService({
    branchId: 'branch-1',
    requestedStaffIds: ['user-1'],
    role: 'CHEF_ROLE',
    BranchModel,
    UserModel,
  });

  assert.equal(branch.assignedStaff[0].user, 'user-1');
  assert.deepEqual(updatePayload, { $addToSet: { assignedStaff: { $each: [{ user: 'user-1', role: 'CHEF_ROLE' }] } } });
});

test('assignStaffToBranchService rechaza usuarios que ya están asignados a otra sucursal', async () => {
  const BranchModel = {
    findById: () => ({
      select: async () => ({ assignedStaff: [] }),
    }),
    findOne: async () => ({ _id: 'branch-2' }),
    findByIdAndUpdate: async () => null,
  };

  const UserModel = {
    find: async () => [{ _id: 'user-2', rol: 'MESERO_ROLE', isActive: true }],
  };

  await assert.rejects(
    () => assignStaffToBranchService({
      branchId: 'branch-1',
      requestedStaffIds: ['user-2'],
      role: 'MESERO_ROLE',
      BranchModel,
      UserModel,
    }),
    /ya están asignados a otra sucursal/i,
  );
});
