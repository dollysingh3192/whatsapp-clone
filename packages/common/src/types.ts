import { z } from "zod";

export const createUserShema = z.object({
  name: z.string().min(1, "Name is required"), 
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters long")
    .max(128, "Password cannot exceed 128 characters")
});

export const signinUserShema = z.object({
  email: z.string(),
  password: z.string()
});

export const chatSchema = z.object({
  isGroup: z.boolean(), 
  name: z.string().min(1, "Chat name is required").optional(),
});

export const chatParticipantSchema = z.object({
  chatId: z.string().uuid(),
  userId: z.string().uuid()
});

export const messageSchema = z.object({
  chatId: z.string().uuid(),
  senderId: z.string().uuid(), 
  content: z.string().min(1, "Message content is required")
});