import { IsNotEmpty, IsString, Matches } from 'class-validator';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export class PasswordSetDto{
  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
}
