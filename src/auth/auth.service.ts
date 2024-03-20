import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto, RefreshDto, RegisterDto } from './auth.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwt: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async register(body: RegisterDto) {
    const newUser = await this.userService.create({
      ...body,
      role: 'USER',
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    const { password, ...returnedUser } = newUser;
    return {
      user: returnedUser,
      token: tokens.refreshToken,
      expiresIn: 518400,
    };
  }

  async login(body: LoginDto) {
    const user = await this.userService.findByEmail(body.email);

    const passwordMatches = await bcrypt.compare(body.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    const { password, ...returnedUser } = user;
    return {
      user: returnedUser,
      token: tokens.refreshToken,
      expiresIn: 518400,
    };
  }

  async logout(userId: number) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async refreshToken(userId: number, body: RefreshDto) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatches = await bcrypt.compare(
      body.refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      token: tokens.refreshToken,
      expiresIn: 518400,
    };
  }

  async getTokens(userId: number, email: string, role: Role) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
    return;
  }
}
