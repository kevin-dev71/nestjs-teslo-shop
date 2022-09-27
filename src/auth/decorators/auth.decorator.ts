import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { VALID_ROLES } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: VALID_ROLES[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
