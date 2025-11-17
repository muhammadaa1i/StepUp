/**
 * Error type detection utilities
 */

export function isDuplicateUserError(msg: string): boolean {
  return /user with this phone number already exists/i.test(msg);
}

export function isDuplicateNameError(msg: string): boolean {
  return /user with this name already exists/i.test(msg);
}

export function normalizeErrorMessage(msg: string): string {
  if (isDuplicateUserError(msg)) {
    return 'User with this phone number already exists';
  }
  if (isDuplicateNameError(msg)) {
    return 'User with this name already exists';
  }
  return msg;
}
