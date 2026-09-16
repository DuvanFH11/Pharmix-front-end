import { useEffect } from "react";
import style from "./cruds.forms.module.css"
import { show, storeOrUpdate } from "../../../../../services/role.service";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import { useForm } from "react-hook-form";
import { roleSchema, type RoleSchema } from "../../../../../schemas/role.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface RolesFormProps {
    id?: number,
    handleClose: () => void,
    handleSuccess: () => void,
}

const RolesForm = ({ id, handleClose, handleSuccess }: RolesFormProps) => {
    const { isLoading, alertMessage, handleShow, handleSave } = useHandleFormsPages();

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<RoleSchema>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            code: '',
            name: '',
            description: 'Ingresar descripción'
        }
    })
    const onSubmitForm = handleSubmit(async (data) => {
        const success = await handleSave(storeOrUpdate, data, id);
        if (success) {
            handleClose();
            handleSuccess();
        }
    })
    useEffect(() => {
        const loadRole = async () => {
            if (id) {
                const data = await handleShow(show, id);
                if (data) {
                    setValue('code', data.code);
                    setValue('name', data.name);
                    setValue('description', data.description);
                }
            }
        }
        loadRole();
    }, [handleShow, id, setValue])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <form className={style.forms} onSubmit={onSubmitForm}>
                <div className={style.formsContainer}>
                    <h1 className={style.formsTitle}>{id ? 'Editar Rol' : 'Crear Rol'}</h1>
                </div>
                <div className={style.formsContainer}>
                    <span className={"alert__"}>{errors.code && errors.code.message}</span>
                    <input type="text" placeholder="Ingregar código del rol"  {...register('code')} />
                </div>
                <div className={style.formsContainer}>
                    <span className={"alert__"}>{errors.name && errors.name.message}</span>
                    <input type="text" placeholder="Ingresar nombre del rol" {...register('name')} />
                </div>
                <div>
                    <span className={"alert__"}>{errors.description && errors.description.message}</span>
                    <textarea maxLength={250} minLength={5} {...register('description')} />
                </div>
                <div className={style.formsContainer} data-container-buttons="true">
                    <button type="submit" className={style.formsSubmit} data-primary="true" data-icon="true">{id ? 'Modificar' : 'Crear'}</button>
                    <button type="button" className={style.formsExit} data-secondary="true" data-icon="true" onClick={handleClose}>Cerrar</button>
                </div>
            </form >
        </>
    )
}
export default RolesForm;