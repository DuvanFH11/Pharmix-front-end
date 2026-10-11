import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import { useForm } from "react-hook-form";
import { userChangePasSchema, type UserChangePasSchema } from "../../../../../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { sendCode, verifyCode } from "../../../../../services/user.service";
import { AuthContext } from "../../../../../context/authContext";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import useHandleRequestMails from "../../../../../hooks/useHandleRequestMails";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import userInputCodeSchema from "../../../../../schemas/code.validation.schema";

const ChangePasswordForm = ({ id, handleSuccess, handleClose }: FormsProps) => {
    const { user } = useContext(AuthContext);
    const [validation, setValidation] = useState<boolean>(false);
    const { isLoading, alertMessage, timeOutCode, requestCodeToEmail, handleVerifyCode } = useHandleRequestMails();


    const { register: registerCode, formState: { errors: errorsCode }, handleSubmit: handleSubmitCode } = useForm({
        resolver: zodResolver(userInputCodeSchema)
    })

    const { register, formState: { errors } } = useForm<UserChangePasSchema>({
        resolver: zodResolver(userChangePasSchema),
    })
    const onSubmitFormCode = handleSubmitCode(async (data) => {
        // const cleanCode = `${data.digit_1}${data.digit_2}${data.digit_3}${data.digit_4}`;
        if (user) {
            console.log("Pasó el filtro")
            // const success = await handleVerifyCode(verifyCode, cleanCode, user.email)
            // if (success) setValidation(true);
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
                        <input className={style.formsInputCode} type="text" min={0} max={9} placeholder="0" maxLength={1} {...registerCode('digit_1')} />
                        <input className={style.formsInputCode} type="text" min={0} max={9} placeholder="0" maxLength={1} {...registerCode('digit_2')} />
                        <input className={style.formsInputCode} type="text" min={0} max={9} placeholder="0" maxLength={1} {...registerCode('digit_3')} />
                        <input className={style.formsInputCode} type="text" min={0} max={9} placeholder="0" maxLength={1} {...registerCode('digit_4')} />
                    </div>
                    <div>
                        <span className="alert__">{errorsCode.digit_1 && errorsCode.digit_1.message}</span>
                        <span className="alert__">{errorsCode.digit_2 && errorsCode.digit_2.message}</span>
                        <span className="alert__">{errorsCode.digit_3 && errorsCode.digit_3.message}</span>
                        <span className="alert__">{errorsCode.digit_4 && errorsCode.digit_4.message}</span>
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
                            <input type="password" placeholder="Cambiar Contraseña" {...register('password')} />
                        </div>
                        {/* <div className={style.formsContainer}>
                        <span className="alert__">{errors.confirm_pass && errors.confirm_pass.message}</span>
                        <input type="password" placeholder="Ingrese la contraseña nuevamente" {...register('confirm_pass')} />
                    </div> */}
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