/**
 * Auth operations factory - exports all operations
 */

import { User, LoginRequest, RegisterRequest } from "@/types";
import { login } from "./operations/login";
import { register } from "./operations/register";
import { forgotPassword } from "./operations/forgotPassword";
import { logout } from "./operations/logout";
import { updateUser } from "./operations/updateUser";

export interface AuthOperationsOptions {
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setTokenVerified: (verified: boolean) => void;
  t: (key: string) => string;
}

export function createAuthOperations({
  setUser,
  setIsLoading,
  setTokenVerified,
  t,
}: AuthOperationsOptions) {
  
  return {
    login: (credentials: LoginRequest) => 
      login({ credentials, setUser, setIsLoading, setTokenVerified, t }),
    
    register: (userData: RegisterRequest) => 
      register({ userData, setUser, setIsLoading, setTokenVerified, t }),
    
    forgotPassword: (payload: { name: string; password?: string; confirm_password?: string }) => 
      forgotPassword({ payload, setIsLoading, t }),
    
    logout: () => 
      logout({ setUser, setTokenVerified, t }),
    
    updateUser: (user: User, userData: Partial<User>) => 
      updateUser({ user, userData, setUser }),
  };
}
