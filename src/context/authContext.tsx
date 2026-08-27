import { createContext } from "react";
export type UserType = {
    id: number,
    name: string;
    email: string,
    age: number,
    email_verified_at: null,
    last_connection: string,
    created_at: string,
    updated_at: string,
    user_creator: string | null,
    user_rol: number,
    user_appointment: number,
}
interface AuthContextProps {
    user: UserType | null;
    loading: boolean | null;
    checkAuth?: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({ user: null, loading: null });


