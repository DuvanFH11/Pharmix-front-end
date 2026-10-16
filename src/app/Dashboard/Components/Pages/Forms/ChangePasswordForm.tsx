import { useForm } from "react-hook-form";
import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import { userChangePassSchema, type UserChangePassSchema } from "../../../../../schemas/user.schema";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import { changePassword } from "../../../../../services/user.service";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import { zodResolver } from "@hookform/resolvers/zod";

const ChangePasswordForm = ({ id, handleSuccess, handleClose }: FormsProps) => {
    const { isLoading, alertMessage, handleEdit } = useHandleFormsPages();

    const { register, formState: { errors }, handleSubmit } = useForm<UserChangePassSchema>({
        resolver: zodResolver(userChangePassSchema),
    })
    const onSubmitFormPass = handleSubmit(async (data) => {
        if (id) {
            const success = await handleEdit(changePassword, id, data.confirm_pass);
            if (success) handleSuccess(); handleClose();
        } else handleClose();
    })
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            <form className={style.forms}>
                <h1>{id && "Cambiar contraseña"}</h1>
                <div className={style.formsContainer}>
                    <span className="alert__">{errors.password && errors.password.message}</span>
                    <input type="password" placeholder="Nueva contraseña" {...register('password')} />
                </div>
                <div className={style.formsContainer}>
                    <span className="alert__">{errors.confirm_pass && errors.confirm_pass.message}</span>
                    <input type="password" placeholder="Confirmar contraseña" {...register('confirm_pass')} />
                </div>
                <div className={style.formsContainer} data-container-buttons="true">
                    <button type="submit" data-primary="true" data-icon="true" className={style.formsSubmit} onClick={onSubmitFormPass}>Cambiar Contraseña</button>
                    <button type="button" data-secondary="true" data-icon="true" className={style.formsExit} onClick={() => { handleClose() }}>Cerrar</button>
                </div>
            </form >
        </>
    )
}

export default ChangePasswordForm;