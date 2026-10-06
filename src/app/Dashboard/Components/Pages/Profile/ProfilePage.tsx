import { useContext } from "react";
import style from "./profile.module.css";
import { AuthContext } from "../../../../../context/authContext";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <div className={style.profileContent}>
                <div className={style.profileContainer} data-container-info="true">
                    <h4>User Information</h4>
                    <div className={style.profileSubContainer} data-info="true">
                        <h6>Name</h6>
                        <p>{user && user.name}</p>
                    </div>
                    <div className={style.profileSubContainer} data-info="true">
                        <h6>Email</h6>
                        <p>{user && user.email}</p>
                    </div>
                    <h4>Account Information</h4>
                    <div className={style.profileSubContainer} data-info="true">
                        <h6>JobTitle</h6>
                        <p>{user && user.user_job_title.name}</p>
                    </div>
                    <div className={style.profileSubContainer} data-info="true">
                        <h6>Role</h6>
                        <p>{user && user.user_role.name}</p>
                    </div>
                </div>
                <div className={style.profileContainer} data-container-options="true">
                    <h4>Options</h4>
                    <div className={style.profileSubContainer} data-options="true">
                        <div>
                            <h5 className={style.optionTitle}>Cambiar Nombre</h5>
                            <p className={style.optionContent}>Gestión para el respectivo cambio de contraseña de cada usuario</p>
                        </div>
                        <div>
                            <button type="button" data-primary="true" data-icon="true"><OpenInNewIcon /></button>
                        </div>
                    </div>
                    <div className={style.profileSubContainer} data-options="true">
                        <div>
                            <h5 className={style.optionTitle}>Cambiar email</h5>
                            <p className={style.optionContent}>Gestión para el respectivo cambio de contraseña de cada usuario</p>
                        </div>
                        <div>
                            <button type="button" data-primary="true" data-icon="true"><OpenInNewIcon /></button>
                        </div>
                    </div>
                    <div className={style.profileSubContainer} data-options="true">
                        <div>
                            <h5 className={style.optionTitle}>Cambiar contraseña</h5>
                            <p className={style.optionContent}>Gestión para el respectivo cambio de contraseña de cada usuario</p>
                        </div>
                        <div>
                            <button type="button" data-primary="true" data-icon="true"><OpenInNewIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfilePage;