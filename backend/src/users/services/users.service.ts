import { Injectable } from '@nestjs/common';
import { db } from 'src/config/drizzle.config';
import { users } from 'src/drizzle/schemas/user.schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  async createUser(userData: {
    firstName: string;
    lastName: string;
    displayName: string;
    emailAddress: string;
    hashedPassword: string;
  }) {
    try {
      const { firstName, lastName, displayName, emailAddress, hashedPassword } =
        userData;

      // Check if the user already exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.emailAddress, emailAddress))
        .limit(1);

      if (existingUser.length > 0) {
        // Return the error message directly when user exists
        return { message: 'User already exists' };
      }

      // Hash the password before storing it
      const salt = await bcrypt.genSalt(10); // Generate salt
      const hashedPasswordWithSalt = await bcrypt.hash(hashedPassword, salt);

      const [newUser] = await db
        .insert(users)
        .values({
          firstName,
          lastName,
          displayName,
          emailAddress,
          hashedPassword: hashedPasswordWithSalt, // Store the hashed password
        })
        .returning();

      // Return success message with new user data
      return {
        message: 'User created successfully',
        user: newUser, // Send the user object in response
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  }

  async getUserByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.emailAddress, email))
      .limit(1);

    return result[0] || null;
  }
}
