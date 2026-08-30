import { useEffect, useState } from "react";
import api, { tokenCSRF } from "../plugins/axios";
import { AuthContext } from "../context/authContext";
import type { UserInterface } from "../interfaces/UserInterface";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const checkAuth = async () => {
        try {
            await tokenCSRF();
            const res = await api.get('/user');
            setUser(res.data);
        } catch (err) {
            console.log({ err });
            setUser(null);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        checkAuth();
    }, [children]);

    return (
        <AuthContext value={{ user, loading, checkAuth }} >
            {!loading && children}
        </AuthContext>
    );
}