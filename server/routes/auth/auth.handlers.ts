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

export const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
  const data = c.req.valid("json");
  const hashedPassword = hash("sha256", data.password);
  const [user] = await db.insert(users).values({ ...data, password: hashedPassword }).returning();
  return c.json(user, HttpStatusCodes.OK);
};
