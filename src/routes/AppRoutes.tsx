import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/protectedRoute";
import Login from "../app/Access/Login";
import Dashboard from "../app/Dashboard/Dashboard";
import DashboardPage from "../app/Dashboard/Components/Pages/Dashboard/DashboardPage";
import UsersPages from "../app/Dashboard/Components/Pages/Users/UsersPage";
import ProductsPage from "../app/Dashboard/Components/Pages/Products/ProductsPage";
import ProfilePage from "../app/Dashboard/Components/Pages/Profile/ProfilePage";
import JobTitlesPage from "../app/Dashboard/Components/Pages/JobTitles/JobTitlesPage";
import RolesPage from "../app/Dashboard/Components/Pages/Roles/RolesPage";
import DashboardHome from "../app/Dashboard/Components/Pages/Dashboard/Content/Home/DashboardHome";
import DashboardRequest from "../app/Dashboard/Components/Pages/Dashboard/Content/Request/DashboardRequest";
import DashboardInvoices from "../app/Dashboard/Components/Pages/Dashboard/Content/Invoices/DashboardInvoices";
import DashboardInventory from "../app/Dashboard/Components/Pages/Dashboard/Content/Inventory/DashboardInventory";
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} >
                        <Route path="content" element={<DashboardPage />} >
                            <Route index={true} element={<DashboardHome />} />
                            <Route path="request" element={<DashboardRequest />} />
                            <Route path="invoices" element={<DashboardInvoices />} />
                            <Route path="inventory" element={<DashboardInventory />} />
                        </Route>
                        <Route path="users_page" element={<UsersPages />} />
                        <Route path="products_page" element={<ProductsPage />} />
                        <Route path="profile_page" element={<ProfilePage />} />
                        <Route path="job_titles_page" element={<JobTitlesPage />} />
                        <Route path="roles_page" element={<RolesPage />} />
                    </Route>
                </Route>
            </Routes >
        </>
    )
}
export default AppRoutes;