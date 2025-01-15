import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"), 
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password cannot exceed 128 characters")
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