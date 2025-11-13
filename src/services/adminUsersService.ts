// Admin users service with modular helpers
import { UserEndpoints } from "@/lib/api/endpoints";
import { SearchParams, User } from "@/types";
import { get, getNoCache, put, del } from "./admin-users/http";
import {
  unwrap,
  normalizeList,
  ListResult,
} from "./admin-users/normalize";

export type UsersListResult<T = User> = ListResult<T>;

export const AdminUsersService = {
  async list<T = User>(filters: SearchParams): Promise<ListResult<T>> {
    const res = await get(
      UserEndpoints.LIST,
      filters as unknown as Record<string, unknown>
    );
    const raw = unwrap(res);
    return normalizeList<T>(raw, filters);
  },

  async getById(id: number): Promise<User> {
    const res = await getNoCache(UserEndpoints.BY_ID(id));
    return unwrap<User>(res);
  },

  async getProfile(): Promise<User> {
    const res = await getNoCache(UserEndpoints.PROFILE);
    return unwrap<User>(res);
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const res = await put(UserEndpoints.UPDATE_PROFILE, data);
    return unwrap<User>(res);
  },

  async update(id: number, data: Partial<User>): Promise<User> {
    const res = await put(UserEndpoints.UPDATE(id), data);
    return unwrap<User>(res);
  },

  async delete(id: number): Promise<void> {
    await del(UserEndpoints.DELETE(id));
  },
};
