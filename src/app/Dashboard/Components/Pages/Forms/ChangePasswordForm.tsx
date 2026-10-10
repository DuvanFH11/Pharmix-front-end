import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import { useForm } from "react-hook-form";
import { userChangePasSchema, type UserChangePasSchema } from "../../../../../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { sendCode } from "../../../../../services/user.service";
import { AuthContext } from "../../../../../context/authContext";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";

const ChangePasswordForm = ({ id, handleSuccess, handleClose }: FormsProps) => {
    const { user } = useContext(AuthContext);
    const [validation, setValidation] = useState<boolean>(false);
    const { isLoading, setLoading } = useHandleFormsPages();
    const { register, formState: { errors }, handleSubmit } = useForm<UserChangePasSchema>({
        resolver: zodResolver(userChangePasSchema)
    })
    useEffect(() => {
        const handleSendCode = async () => {
            if (user) {
                setLoading(true);
                const success = await sendCode(user.email);
                setLoading(false);
                if (!success) handleClose();
            } else handleClose();
        }
        handleSendCode();
    }, [handleClose, user, setLoading]);
    return (
        <>
            {isLoading && <LoadingComponent />}

            {!isLoading ?
                !validation ? (
                    <form className={style.forms}>
                        <h2 className={style.formsTitle}>Se ha enviado un código a su correo, ingreselo por favor.</h2>
                        <div className={style.formsContainer} data-container-code="true">
                            <input className={style.formsInputCode} type="number" />
                            <input className={style.formsInputCode} type="number" />
                            <input className={style.formsInputCode} type="number" />
                            <input className={style.formsInputCode} type="number" />
                        </div>
                        <button >Reenviar código</button>
                        <div className={style.formsContainer} data-container-buttons="true">
                            <button className={style.formsSubmit} data-icon="true" data-primary="true">Enviar Código</button>
                            <button className={style.formsExit} data-secondary="true" data-icon="true" onClick={handleClose}>Cerrar</button>
                        </div>
                    </form >
                ) : (
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
                )
                : null
            }
        </>
    )
}

export default ChangePasswordForm;