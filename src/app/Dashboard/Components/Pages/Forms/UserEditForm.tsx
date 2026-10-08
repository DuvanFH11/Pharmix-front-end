import { useEffect } from "react";
import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import { show } from "../../../../../services/user.service";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import { useForm } from "react-hook-form";
import { userEditSchema, type UserEditSchema } from "../../../../../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const UserEditForm = ({ id, handleSuccess, handleClose }: FormsProps) => {
    const { handleShow, isLoading, alertMessage } = useHandleFormsPages();
    const { register, formState: { errors }, handleSubmit, setValues } = useForm<UserEditSchema>({
        resolver: zodResolver(userEditSchema)
    })
    const onSubmitForm = handleSubmit(async (data) => {
        console.log("exito");
        handleClose();
        handleSuccess();
    });
    useEffect(() => {
        const loadUser = async () => {
            const data = await handleShow(show, id);
            if (data) setValues({
                'email': data.email, 'name': data.name
            })
        }
        loadUser();
    }, [handleShow, id, setValues])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            <form className={style.forms} onSubmit={onSubmitForm}>
                <h1>{id && "Editar Información del usuario"}</h1>

                <div className={style.formsContainer}>
                    <span className="alert__">{errors.name && errors.name.message}</span>
                    <input type="text" placeholder="Modifique el nombre" {...register('name')} />
                </div>
                <div className={style.formsContainer}>
                    <span className="alert__">{errors.email && errors.email.message}</span>
                    <input type="email" placeholder="Modifique el email" {...register('email')} />
                </div>
                <div className={style.formsContainer} data-container-buttons="true">
                    <button type="submit" data-primary="true" data-icon="true" className={style.formsSubmit} onClick={handleSuccess}>Modificar</button>
                    <button type="button" data-secondary="true" data-icon="true" className={style.formsExit} onClick={handleClose}>Cerrar</button>
                </div>
            </form >
        </>
    )
}
export default UserEditForm;