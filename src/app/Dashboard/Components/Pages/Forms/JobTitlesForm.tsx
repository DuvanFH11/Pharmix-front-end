import { useForm } from "react-hook-form";
import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import { jobTitleSchema, type JobTitleSchema } from "../../../../../schemas/job.title.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import { show, storeOrUpdate } from "../../../../../services/job.title.service";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";

const JobTitlesForm = ({ id, handleClose, handleSuccess }: FormsProps) => {
    const { isLoading, alertMessage, handleShow, handleSave } = useHandleFormsPages();

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<JobTitleSchema>({
        resolver: zodResolver(jobTitleSchema),
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
        const loadJobTitle = async () => {
            if (id) {
                const data = await handleShow(show, id);
                if (data) {
                    setValue('code', data.code);
                    setValue('name', data.name);
                    setValue('description', data.description);
                }
            }
        };
        loadJobTitle();
    }, [handleShow, id, setValue])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <form className={style.forms} onSubmit={onSubmitForm}>
                <div className={style.formsContainer}>
                    <h1>{id ? "Editar Cargo" : "Crear cargo"}</h1>
                </div>
                <div className={style.formsContainer}>
                    <span className="alert__">{errors.code && errors.code.message}</span>
                    <input type="text" placeholder="Ingresa el código del cargo" {...register('code')} />
                </div>
                <div className={style.formsContainer}>
                    <span className="alert__">{errors.name && errors.name.message}</span>
                    <input type="text" placeholder="Ingresa el nombre del cargo" {...register('name')} />
                </div>
                <div className={style.formsContainer}>
                    <span className="alert__">{errors.description && errors.description.message}</span>
                    <textarea maxLength={250} minLength={5} {...register('description')} />
                </div>
                <div className={style.formsContainer} data-container-buttons="true">
                    <button type="submit" className={style.formsSubmit} data-primary="true" data-icon="true">{id ? "Modificar" : "Crear"}</button>
                    <button type="button" className={style.formsExit} data-secondary="true" data-icon="true" onClick={handleClose}>Cerrar</button>
                </div>
            </form>
        </>
    )
}

export default JobTitlesForm;