import { hc } from "hono/client";
import type { AppType } from "@/shared/types";

const client = hc<AppType>('http://localhost:9999/');

export const getTasks = async () => {
  const res = await client.tasks.$get();
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};
