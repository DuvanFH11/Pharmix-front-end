import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/protectedRoute";
import Login from "../app/Access/Login";
import Register from "../app/Access/Register";
import Dashboard from "../app/Dashboard/Dashboard";
import DashboardPage from "../app/Dashboard/Components/Pages/Dashboard/DashboardPage";
import UsersPages from "../app/Dashboard/Components/Pages/Users/UsersPage";
import ProductsPage from "../app/Dashboard/Components/Pages/Products/ProductsPage";
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} >
                        <Route index={true} element={<DashboardPage />} />
                        <Route path="users_page" element={<UsersPages />} />
                        <Route path="products_page" element={<ProductsPage />} />
                    </Route>

                </Route>
            </Routes >
        </>
    )
}

export default AppRoutes;