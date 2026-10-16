import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { sendCode, verifyCode } from "../../../../../services/user.service";
import { AuthContext } from "../../../../../context/authContext";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import useHandleRequestMails from "../../../../../hooks/useHandleRequestMails";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import userInputCodeSchema from "../../../../../schemas/code.validation.schema";
import { userChangePassSchema, type UserChangePassSchema } from "../../../../../schemas/user.schema";

const ChangePasswordForm = ({ id, handleSuccess, handleClose }: FormsProps) => {
    const { user } = useContext(AuthContext);
    const [validation, setValidation] = useState<boolean>(false);
    const { isLoading, alertMessage, timeOutCode, requestCodeToEmail, handleVerifyCode } = useHandleRequestMails();


    const { register: registerCode, formState: { errors: errorsCode }, handleSubmit: handleSubmitCode } = useForm({
        resolver: zodResolver(userInputCodeSchema)
    })

    const { register, formState: { errors }, handleSubmit: handleSubmitPass } = useForm<UserChangePassSchema>({
        resolver: zodResolver(userChangePassSchema),
    })
    const onSubmitFormPass = handleSubmitPass((data) => {
        if (user) {
            const success = await handleChangePassword
        }
    })
    const onSubmitFormCode = handleSubmitCode(async (data) => {
        if (user) {
            const success = await handleVerifyCode(verifyCode, data.code, user.email)
            if (success) setValidation(true);
        }
    })
    const requestCode = async () => {
        if (user) requestCodeToEmail(sendCode, user.email);
    }
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            {!validation ?
                <form className={style.forms}>
                    <h1 className={style.formsTitle}>Verificar Código</h1>
                    <div className={style.formsContainer} data-container-code="true">
                        <input className={style.formsInputCode}
                            type="text"
                            minLength={4}
                            maxLength={4}
                            {...registerCode('code')}
                        />
                    </div>
                    <div>
                        <span className="alert__">{errorsCode.code && errorsCode.code.message}</span>
                    </div>
                    <div className={style.formsContainer} data-container-buttons="true">
                        <button className={style.formsRequestCode} type="button" onClick={requestCode} disabled={timeOutCode ? true : false}>
                            {timeOutCode ? `Nuevo código en : ${timeOutCode}` : 'Solicitar código'}
                        </button>
                    </div>
                    <div className={style.formsContainer} data-container-buttons="true">
                        <button className={style.formsSubmit} data-icon="true" data-primary="true" onClick={onSubmitFormCode}>Enviar Código</button>
                        {!timeOutCode ? < button type="button" className={style.formsExit} data-secondary="true" data-icon="true" onClick={handleClose}>Cerrar</button> : null}
                    </div>
                </form >
                : (
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
                            <button type="submit" data-primary="true" data-icon="true" className={style.formsSubmit} onClick={handleSuccess}>Cambiar Contraseña</button>
                            <button type="button" data-secondary="true" data-icon="true" className={style.formsExit} onClick={() => { handleClose(); setValidation(false) }}>Cerrar</button>
                        </div>
                    </form >
                )}
        </>
    )
}

export default ChangePasswordForm;