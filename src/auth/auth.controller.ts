import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseBoolPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, RegisterDto } from './auth.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req) {
    const userId = req.user.sub;
    return await this.authService.logout(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('refresh')
  async refresh(@Body() body: RefreshDto, @Req() req) {
    const userId = req.user.sub;
    return await this.authService.refreshToken(userId, body);
  }
}
