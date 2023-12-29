import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, passowrd: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    console.log(email);
    if (user && user.password === passowrd) {
      const { password, ...rest } = user;
      console.log(rest);
      return rest;
    }
    return null;
  }
}
