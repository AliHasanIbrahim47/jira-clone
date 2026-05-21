import type { z } from "zod";

import { hc } from "hono/client";

import type { AppType } from "@/shared/types";
import type { signInSchema, signUpSchema } from "~/db/schema";

const client = hc<AppType>("http://localhost:9999/");

export async function getTasks() {
  const res = await client.tasks.$get();
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

export async function postSignIn(data: z.infer<typeof signInSchema>) {
  const res = await client.auth["sign-in"].$post({
    json: data,
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

export async function postSignUp(data: z.infer<typeof signUpSchema>) {
  const res = await client.auth["sign-up"].$post({
    json: data,
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}
