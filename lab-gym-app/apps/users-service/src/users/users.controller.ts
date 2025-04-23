// apps/users-service/src/users/users.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Текущий профиль пользователя' })
  @Get('me')
  getProfile(@Req() req: any) {
    // req.user — то, что вернул JwtStrategy.validate()
    return req.user;
  }
}
