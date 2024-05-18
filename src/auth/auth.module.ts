import { Global, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './passport/session.serializer';
import { AuthController } from './auth.controller';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { MagicloginStrategy } from './passport/magiclogin.strategy';


@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [
    SessionSerializer,
    AuthService,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    MagicloginStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
