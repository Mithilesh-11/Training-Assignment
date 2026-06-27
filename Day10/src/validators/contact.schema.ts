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

export const updateContactSchema = contactSchema.partial();

export type ContactInput =z.infer<typeof contactSchema>;

export type UpdateContactInput =z.infer<typeof updateContactSchema>;