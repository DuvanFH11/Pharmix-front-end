import { createContext } from "react";
import type { UserType } from "../interfaces/UserInterface";


interface AuthContextProps {
    user: UserType | null;
    loading: boolean | null;
    checkAuth?: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({ user: null, loading: null });


