import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  first_name: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  last_name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(30)
  // @Matches(
  //   /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   {
  //     message: 'Password is too weak! Choose Strong Password',
  //   },
  // )
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
