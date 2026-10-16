import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { sendCode, verifyCode } from "../../../../../services/user.service";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import useHandleRequestMails from "../../../../../hooks/useHandleRequestMails";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import userInputCodeSchema from "../../../../../schemas/code.validation.schema";
import ChangePasswordForm from "./ChangePasswordForm";


const VerifyCodeForm = ({ id, email, handleSuccess, handleClose }: FormsProps) => {
    const [validation, setValidation] = useState<boolean>(false);
    const { isLoading, alertMessage, timeOutCode, requestCodeToEmail, handleVerifyCode } = useHandleRequestMails();

    const { register, formState: { errors: errorsCode }, handleSubmit } = useForm({
        resolver: zodResolver(userInputCodeSchema)
    })

    const onSubmitFormCode = handleSubmit(async (data) => {
        if (email) {
            const success = await handleVerifyCode(verifyCode, data.code, email)
            if (success) setValidation(true);
        }
    })

    const requestCode = async () => {
        if (email) requestCodeToEmail(sendCode, email);
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
                            {...register('code')}
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
                    <ChangePasswordForm id={id} handleSuccess={handleSuccess} handleClose={handleClose} />
                )}
        </>
    )
}

export default VerifyCodeForm;