import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";

const ChangePasswordForm = ({ id, handleSuccess, handleClose }: FormsProps) => {
    return (
        <>
            <form className={style.forms}>
                <h1>Cambiar Contraseña</h1>
                <div className={style.formsContainer} data-container-buttons="true">
                    <button type="button" data-secondary="true" className={style.formsExit} onClick={() => handleClose}>Cerrar</button>
                </div>
            </form>
        </>
    )
}

export default ChangePasswordForm;