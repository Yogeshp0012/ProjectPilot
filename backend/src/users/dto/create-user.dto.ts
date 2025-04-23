import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  IsBoolean,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  activeWorkspaceId?: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @IsOptional()
  @IsString()
  userType?: string;

  @IsOptional()
  emailVerifiedAt?: Date;

  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @IsOptional()
  @IsBoolean()
  isLoginEnabled?: boolean;
}
