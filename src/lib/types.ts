import type { User } from '@prisma/client';

export type ClientUser = Omit<User, "passwordHash" | "createdAt" | "updatedAt">;