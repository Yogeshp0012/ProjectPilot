import { pgTable, serial, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  userId: serial('user_id').primaryKey(),

  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  emailAddress: varchar('email_address', { length: 255 }).notNull().unique(),
  hashedPassword: varchar('hashed_password', { length: 255 }).notNull(),

  activeWorkspaceId: varchar('active_workspace_id', { length: 255 }),
  profilePictureUrl: varchar('profile_picture_url', { length: 255 }),
  userType: varchar('user_type', { length: 255 }),
  emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
  preferredLanguage: varchar('preferred_language', { length: 10 }),
  isLoginEnabled: boolean('is_login_enabled'),
});
