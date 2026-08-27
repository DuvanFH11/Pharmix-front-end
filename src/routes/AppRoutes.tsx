import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/protectedRoute";
import Login from "../app/Access/Login";
import Register from "../app/Access/Register";
import Dashboard from "../app/Dashboard/Dashboard";
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />

                </Route>
            </Routes >
        </>
    )
}

export default AppRoutes;