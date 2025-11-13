export const UZBEK_MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
] as const;

export const FIELD_NAME_MAP: Record<string, string> = {
  name: 'name',
  surname: 'surname',
  phone_number: 'phone number',
  password: 'password',
  confirm_password: 'confirm password',
  username: 'username',
} as const;

export const DEFAULT_PLACEHOLDER_IMAGE = "/placeholder-product.svg";
export const IMAGE_BASE_URL = "https://stepupy.duckdns.org";
