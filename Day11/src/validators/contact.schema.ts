import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
      .email("Invalid email format"),

  phone: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Phone number must contain exactly 10 digits"
    ),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address cannot exceed 255 characters")
});


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


export const updateContactSchema = contactSchema.partial();

export type ContactInput =z.infer<typeof contactSchema>;

export type UpdateContactInput =z.infer<typeof updateContactSchema>;

export type ContactListQueryInput = z.infer<typeof contactListQuerySchema>;
