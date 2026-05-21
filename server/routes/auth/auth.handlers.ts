import { eq } from "drizzle-orm";
import { hash } from "node:crypto";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "~/lib/types";

import db from "~/db";
import { users } from "~/db/schema";

import type { SignInRoute, SignUpRoute } from "./auth.routes";

export const signIn: AppRouteHandler<SignInRoute> = async (c) => {
  const data = c.req.valid("json");
  const user = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });
  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );
  }
  const hashedPassword = hash("sha256", data.password);
  if (hashedPassword !== user.password) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }
  return c.json(user, HttpStatusCodes.OK);
};

// Same UX for both paths: hitting the duplicate check first vs losing a race still means
// "email is already taken". Any non-duplicate insert failure skips the `if` below and `throw err`
// bubbles to the global handler (typically 500 with logging / sanitized client message).
const DUPLICATE_EMAIL_MESSAGE = "An account with this email already exists";

/** True only when SQLite rejected the insert for a UNIQUE constraint (e.g. email race). */
function isSqliteUniqueViolation(err: unknown): boolean {
  let current: unknown = err;
  let depth = 0;
  while (current instanceof Error && depth++ < 8) {
    if (current.message.includes("UNIQUE constraint failed")) {
      return true;
    }
    current = current.cause;
  }
  return false;
}

export const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
  const data = c.req.valid("json");
  const hashedPassword = hash("sha256", data.password);

  const existing = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });
  if (existing) {
    return c.json({ message: DUPLICATE_EMAIL_MESSAGE }, HttpStatusCodes.CONFLICT);
  }

  try {
    const [user] = await db.insert(users).values({ ...data, password: hashedPassword }).returning();
    return c.json(user, HttpStatusCodes.OK);
  }
  catch (err) {
    // Only UNIQUE violations are treated as duplicate email; anything else propagates unchanged.
    if (isSqliteUniqueViolation(err)) {
      return c.json({ message: DUPLICATE_EMAIL_MESSAGE }, HttpStatusCodes.CONFLICT);
    }
    throw err;
  }
};
