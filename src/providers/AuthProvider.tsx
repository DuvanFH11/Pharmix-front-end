import { useEffect, useState } from "react";
import api, { tokenCSRF } from "../plugins/axios";
import { AuthContext, type UserType } from "../context/authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
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