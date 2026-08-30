import { useHandleForm } from "../../hooks/useHandleForms";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import CustomFooter from "./Components/Footer/CustomFooter";
import CustomHeader from "./Components/Header/CustomHeader";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    const { isLoading, alertMessage } = useHandleForm();

    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} state={alertMessage.state} time={alertMessage.time} />}

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