import { createContext } from "react";
import type { UserInterface } from "../interfaces/UserInterface";

interface AuthContextProps {
    user: UserInterface | null;
    loading: boolean | null;
    checkAuth?: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({ user: null, loading: null });


