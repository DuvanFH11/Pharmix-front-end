import { useContext, useState } from "react";
import style from "./profile.module.css";
import { AuthContext } from "../../../../../context/authContext";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Dialog } from "@mui/material";
import UserEditForm from "../Forms/UserEditForm";
import ChangePasswordForm from "../Forms/ChangePasswordForm";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState<boolean>(false);

    const showSuccess = () => {
        console.log("Exitoso");
    }
    return (
        <>
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
                            <button type="button" data-primary="true" data-icon="true" onClick={() => setShowModal(true)}><OpenInNewIcon /></button>
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
                            <button type="button" data-primary="true" data-icon="true" onClick={() => setShowModal(true)}><OpenInNewIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={showModal}>
                {showModal && <UserEditForm id={1} handleClose={() => { setShowModal(false) }} handleSuccess={() => { showSuccess() }} />}
                {showModal && <ChangePasswordForm id={1} handleClose={() => { setShowModal(false) }} handleSuccess={() => { showSuccess() }} />}
            </Dialog>
        </>
    )
}
export default ProfilePage;