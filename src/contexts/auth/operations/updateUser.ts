/**
 * Update user operation
 */

import { User } from "@/types";
import { updateStoredUser } from "../authStorage";

interface UpdateUserOptions {
  user: User;
  userData: Partial<User>;
  setUser: (user: User | null) => void;
}

export function updateUser({
  user,
  userData,
  setUser,
}: UpdateUserOptions): void {
  const updatedUser = { ...user, ...userData };
  setUser(updatedUser);
  updateStoredUser(updatedUser);
}
