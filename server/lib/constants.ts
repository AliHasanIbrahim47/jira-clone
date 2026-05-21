import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: "Required",
  EXPECTED_NUMBER: "Invalid input: expected number, received NaN",
  NO_UPDATES: "No updates provided",
  EXPECTED_STRING: "Invalid input: expected string, received undefined",
  NOT_FOUND: "Not found",
};

export const ZOD_ERROR_CODES = {
  INVALID_UPDATES: "invalid_updates",
  NOT_FOUND: "not_found",
};

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);

export const conflictSchema = createMessageObjectSchema(HttpStatusPhrases.CONFLICT);
