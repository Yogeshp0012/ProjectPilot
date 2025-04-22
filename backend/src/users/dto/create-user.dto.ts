import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)  
  hashedPassword: string;
}