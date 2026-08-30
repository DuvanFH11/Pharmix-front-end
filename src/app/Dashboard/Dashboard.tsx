import AlertMessage from "../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useHandleFormAccess } from "../../hooks/useHandleFormsAccess";
import CustomFooter from "./Components/Footer/CustomFooter";
import CustomHeader from "./Components/Header/CustomHeader";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    const { isLoading, alertMessage } = useHandleFormAccess();

    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            {/* Header */}
            <CustomHeader />

            {/* Main Content */}
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <CustomFooter />
        </>
    )
}

export default Dashboard;