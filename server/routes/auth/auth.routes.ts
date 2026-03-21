import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { selectUsersSchema, signInSchema, signUpSchema } from "~/db/schema";
import { notFoundSchema } from "~/lib/constants";

const tags = ["Auth"];

export const signIn = createRoute({
  path: "/auth/sign-in",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      signInSchema,
      "The login data",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUsersSchema,
      "The authenticated user",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      notFoundSchema,
      "Invalid credentials",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(signInSchema),
      "The validation error(s)",
    ),
  },
});

export const signUp = createRoute({
  path: "/auth/sign-up",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      signUpSchema,
      "The sign up data",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUsersSchema,
      "The created user",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(signUpSchema),
      "The validation error(s)",
    ),
  },
});

export type SignInRoute = typeof signIn;
export type SignUpRoute = typeof signUp;
