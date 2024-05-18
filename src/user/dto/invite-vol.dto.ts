import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from '../../auth/roles.enum';

export class InviteVolDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  Poc: number;
}
