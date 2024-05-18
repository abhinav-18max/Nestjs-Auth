import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/Authenticated.guard';
import { Request, Response } from 'express';
import { Roles } from './decorators/Roles.decorator';
import { Role } from './roles.enum';
import { MagicloginStrategy } from './passport/magiclogin.strategy';
import { AuthGuard } from '@nestjs/passport';
import { PasswordSetDto } from '../user/dto/passwordset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private strategy: MagicloginStrategy,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Session() session: Record<string, any>, @Res() res: Response) {
    console.log(session);

    return res
      .status(201)
      .json({ message: 'User logged in', user: session.passport.user });
  }

  @UseGuards(AuthenticatedGuard) @Get('status') getStatus(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(req.user);
    res.send(req.user);
  }
  @Roles(Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile() {
    return 'profile';
  }

  @Post('profileset')
  async Send(@Req() req: Request, @Res() res: Response) {
    const resp = await this.userService.checkEmail(req.body.destination);
    if (resp == null) {
      return res.status(230).json({ message: 'Email does not exist' });
    }
    return this.strategy.send(req, res);
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Post('login/callback')
  async callback(@Req() req, @Body() PasswordSetDto: PasswordSetDto) {
    if (req.user.spec === 'invite-poc') {
      console.log(req.user);
      const res= await this.userService.createUserPoc(req.user.email, PasswordSetDto);
      console.log(res);
    }
  }
}
