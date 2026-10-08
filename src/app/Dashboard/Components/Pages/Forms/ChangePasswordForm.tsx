import { useEffect } from "react";
import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import { useForm } from "react-hook-form";
import { userChangePasSchema, type UserChangePasSchema } from "../../../../../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ChangePasswordForm = ({ id, handleSuccess, handleClose }: FormsProps) => {
    const { register, formState: { errors }, handleSubmit } = useForm<UserChangePasSchema>({
        resolver: zodResolver(userChangePasSchema)
    })

    return (
        <>
            <form className={style.forms}>
                <div className={style.formsContainer}>
                    <p className="text-primary">Se ha enviado un código a su correo, ingreselo por favor</p>
                </div>
                <div className={style.formsContainer}>
                    <input type="number" placeholder="ingrese el primer dígito" />
                    <input type="number" placeholder="ingrese el primer dígito" />
                    <input type="number" placeholder="ingrese el primer dígito" />
                    <input type="number" placeholder="ingrese el primer dígito" />
                </div>
            </form>
            <form className={style.forms}>
                <h1>{id && "Cambiar contraseña"}</h1>
                <div className={style.formsContainer}>
                    <span className="alert__">{errors.password && errors.password.message}</span>
                    <input type="password" placeholder="Cambiar Contraseña" {...register('password')} />
                </div>
                <div className={style.formsContainer} data-container-buttons="true">
                    <button type="submit" data-primary="true" data-icon="true" className={style.formsSubmit} onClick={handleSuccess}>Cambiar</button>
                    <button type="button" data-secondary="true" data-icon="true" className={style.formsExit} onClick={handleClose}>Cerrar</button>
                </div>
            </form>
        </>
    )
}

export default ChangePasswordForm;