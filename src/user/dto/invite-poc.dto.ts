import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../auth/roles.enum';

export class InvitePocDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
