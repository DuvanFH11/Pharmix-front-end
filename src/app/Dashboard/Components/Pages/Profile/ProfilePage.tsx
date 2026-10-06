import { useContext } from "react";
import style from "./profile.module.css";
import { AuthContext } from "../../../../../context/authContext";

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
                <div className={style.profileContainer}>
                    <h4>Options</h4>
                    <button>
                        <div className={style.profileSubContainer} data-options="true">
                            <h4>Cambiar contraseña</h4>
                        </div>
                    </button>
                    <button>
                        <div className={style.profileSubContainer} data-options="true">
                            <h4>Cambiar contraseña</h4>
                        </div>
                    </button>
                    <button>
                        <div className={style.profileSubContainer} data-options="true">
                            <h4>Cambiar contraseña</h4>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}
export default ProfilePage;