import { useContext, useState } from "react";
import style from "./profile.module.css";
import { AuthContext } from "../../../../../context/authContext";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Dialog } from "@mui/material";
import UserEditForm from "../Forms/UserEditForm";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import { useHandleFormAccess } from "../../../../../hooks/useHandleFormsAccess";
import VerifyCodeForm from "../Forms/VerifyCodeForm";

const ProfilePage = () => {
    const { user, checkAuth } = useContext(AuthContext);
    const id = user ? user.id : 0;
    const email = user ? user.email : undefined;
    const [showForm, setShowForm] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { isLoading, alertMessage, setAlertMessage } = useHandleFormsPages();
    const { handleLogout } = useHandleFormAccess();

    const showFormsOption = (e: React.MouseEvent) => {
        setShowForm(e.currentTarget.id);
        setShowModal(true);
    }
    const showSuccess = async (logout: boolean) => {
        setAlertMessage({ message: 'Datos guardados correctamente, se cerrará la sesión.', success: true, time: Date.now() });
        if (logout) {
            if (checkAuth) {
                setTimeout(async () => {
                    await checkAuth();
                }, 3000);
            }
        } else {
            setTimeout(async () => {
                await handleLogout();
            }, 3000)
        }
    }
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            <div className={style.profileContent}>
                <div className={style.profileContainer} data-container-info="true">
                    <h4>Información del usuario</h4>
                    <div className={style.profileSubContainer} data-info="true">
                        <h6>Nombre</h6>
                        <p>{user && user.name}</p>
                    </div>
                    <div className={style.profileSubContainer} data-info="true">
                        <h6>Email</h6>
                        <p>{user && user.email}</p>
                    </div>
                    <h4>Información de la cuenta</h4>
                    <div className={style.profileSubContainer} data-info="true">
                        <h6>Cargo</h6>
                        <p>{user && user.user_job_title.name}</p>
                    </div>
                    <div className={style.profileSubContainer} data-info="true">
                        <h6>Rol en el sistema</h6>
                        <p>{user && user.user_role.name}</p>
                    </div>
                </div>
                <div className={style.profileContainer} data-container-options="true">
                    <h4>opciones</h4>
                    <div className={style.profileSubContainer} data-options="true">
                        <div>
                            <h5 className={style.optionTitle}>Modificar información del usuario</h5>
                            <p className={style.optionContent}>
                                La actualización de sus datos se hará de forma inmediata en este procedimiento,
                                Se cerrará la sesión para conservar la seguridad de la cuenta y deberá volver a iniciarla.
                            </p>
                        </div>
                        <div>
                            <button id="change_info" type="button" data-primary="true" data-icon="true" onClick={showFormsOption}><OpenInNewIcon /></button>
                        </div>
                    </div>
                    <div className={style.profileSubContainer} data-options="true">
                        <div>
                            <h5 className={style.optionTitle}>Cambiar contraseña</h5>
                            <p className={style.optionContent}>
                                Al momento de hacer el primer ingreso, es necesario realizar esta acción para mantener la seguridad de su cuenta ya
                                que al crearla se asigna una contraseña temporal.<br />
                                Esta acción se puede realizar las veces que considere necesario para mantener la protección de la cuenta y siempre
                                que se efectúe la sesión se cerrará y deberá volver a iniciarla.
                            </p>
                        </div>
                        <div>
                            <button id="change_pass" type="button" data-primary="true" data-icon="true" onClick={showFormsOption}><OpenInNewIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={showModal}>
                {showForm == 'change_info' && showModal && <UserEditForm id={id} handleClose={() => { setShowModal(false) }} handleSuccess={() => { showSuccess(false) }} />}
                {showForm == 'change_pass' && showModal && <VerifyCodeForm id={id} email={email} handleClose={() => { setShowModal(false) }} handleSuccess={() => { showSuccess(true) }} />}
            </Dialog>
        </>
    )
}
export default ProfilePage;