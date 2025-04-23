import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto'; // import the create-user dto

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.createUser(createUserDto);

    // If the result contains the message "User already exists", return it directly
    if (result.message === 'User already exists') {
      return result; // Return the message directly (no need for additional wrapping)
    }

    // If the user is created successfully, return the success message and the user data
    return { message: result.message, user: result.user };
  }

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }
}
