import { z } from "zod";

// Map camelCase query params → DB column names
export const SORT_FIELD_MAP: Record<string, string> = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};

// ─── List query schema ─────────────────────────────────────────────────────
export const contactListQuerySchema = z.object({
  cursor: z.uuid("cursor must be a valid UUID").optional(),

  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v) : 20))
    .pipe(z.number()),

  search: z.string().min(1).optional(),

  email: z.email("Invalid email format").optional(),

  // Accept comma-separated: "name,createdAt"
  sortBy: z
    .string()
    .optional()
    .transform((v) => (v ? v.split(",").map((s) => s.trim()) : ["createdAt"]))
    .pipe(
      z.array( 
        z.enum(["createdAt", "updatedAt"], { error: `sortBy must be one of:"createdAt", "updatedAt"`,} ) 
      )
    ),

  // Accept comma-separated: "asc,desc"
  order: z
    .string()
    .optional()
    .transform((v) => (v ? v.split(",").map((s) => s.trim().toLowerCase()) : ["asc"]))
    .pipe(
      z.array(
        z.enum(["asc", "desc"], {
          error: 'order must be "asc" or "desc"',
        })
      )
    ),
});

export type ContactListQueryInput = z.infer<typeof contactListQuerySchema>;

// ─── Reuse v1 schemas for create/update ───────────────────────────────────
export { contactSchema, updateContactSchema } from "../contact.schema";
export type { ContactInput, UpdateContactInput } from "../contact.schema";
