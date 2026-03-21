import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { toZodV4SchemaTyped } from "~/lib/zod-utils";

export const users = sqliteTable("users", {
  id: integer({ mode: "number" })
    .primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: integer({ mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const selectUsersSchema = toZodV4SchemaTyped(createSelectSchema(users));

export const insertUsersSchema = toZodV4SchemaTyped(createInsertSchema(
  users,
  {
    name: field => field.min(1, { message: "Name is required" }),
    email: field => field.check(z.email({ message: "Invalid email address" })),
    password: field => field.min(8, { message: "Password must be at least 8 characters" }),
  },
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}));

export const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});
