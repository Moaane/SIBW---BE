import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseBoolPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Query('remember', ParseBoolPipe) remember: boolean,
  ) {
    if (remember == true) {
      const user = await this.authService.loginWithRemember(body);
      return {
        token: user,
        statusCode: HttpStatus.OK,
      };
    }

    const user = await this.authService.login(body);
    return {
      token: user,
      statusCode: HttpStatus.OK,
    };
  }
}
