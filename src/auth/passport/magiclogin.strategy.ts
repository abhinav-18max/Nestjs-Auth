import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { Injectable, Logger } from '@nestjs/common';
import * as process from 'node:process';
import { UserService } from '../../user/user.service';

@Injectable()
export class MagicloginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicloginStrategy.name);
  constructor(private userService: UserService) {
    super({
      secret: process.env.MAGIC_SECRET,
      jwtOptions: {
        expiresIn: '5 days',
      },
      callbackUrl: 'http://localhost:5001/auth/login/callback',
      sendMagicLink: async (destination, href) => {
        this.logger.log(`Sending magic link to ${destination} with ${href}`);
      },
      verify: async (payload, callback) =>
        callback(null, this.validate(payload)),
    });
  }
  async validate(payload: { destination: string }) {
    const user = await this.userService.checkEmail(payload.destination);

    return user;
  }
}
