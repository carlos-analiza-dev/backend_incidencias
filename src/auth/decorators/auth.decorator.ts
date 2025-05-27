import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from './role-protecteted.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from 'src/interfaces/valid-roles';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
