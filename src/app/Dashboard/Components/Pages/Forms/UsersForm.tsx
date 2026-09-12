import { useEffect, useState } from "react";
import { Dialog, FormControl, MenuItem, Select } from "@mui/material";
import type { UserType } from "../../../../../interfaces/UserInterface";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import { show, storeOrUpdate } from "../../../../../services/user.service";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import type { JobTitleInterface } from "../../../../../interfaces/JobTitleInterface";
import type { roleInterface } from "../../../../../interfaces/RoleInterface";
import { index as rolesIndex } from "../../../../../services/role.service";
import { index as jobTitlesIndex } from "../../../../../services/job.title.service";
import style from './cruds.forms.module.css';
import { Controller, useForm } from "react-hook-form";
import { userStoreSchema, type UserStoreSchema } from "../../../../../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface UsersFormProps {
    id: number | null;
    handleClose: () => void
}

const UsersForm = ({ id, handleClose }: UsersFormProps) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [roles, setRoles] = useState<roleInterface[] | null>(null);
    const [jobTitles, setJobTitles] = useState<JobTitleInterface[] | null>(null);

    const { control, handleSubmit, register, formState: { errors }, setValue } = useForm<UserStoreSchema>({
        resolver: zodResolver(userStoreSchema),
        defaultValues: {
            name: '',
            email: '',
            user_role: 0,
            user_job_title: 0
        }
    })

    const { handleShow, handleIndex, handleSave, isLoading, alertMessage } = useHandleFormsPages();
    useEffect(() => {
        const loadValues = async () => {
            setJobTitles(await handleIndex(jobTitlesIndex));
            setRoles(await handleIndex(rolesIndex));
            if (id) {
                const data = await handleShow(show, id);
                setUser(data);
                if (data) {
                    setValue('name', data.name);
                    setValue('email', data.email);
                    setValue('user_role', data.user_role);
                    setValue('user_job_title', data.user_job_title);
                }
            }
        }
        loadValues();
    }, [handleIndex, handleShow, setValue, id]);
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            <Dialog open={true}>
                <form className={style.forms} onSubmit={handleSubmit((data) => handleSave(storeOrUpdate, data))} >
                    <div className={style.formsContainer}>
                        <h2 className={style.formsTitle}>{id ? "Editar Usuario" : "Crear usuario"}</h2>
                    </div>
                    <div className={style.formsContainer}>
                        <span className="alert__">{errors.name ? errors.name.message : ''}</span>
                        <input type="text" placeholder="Ingresa el nombre" {...register('name')} />
                    </div>
                    <div className={style.formsContainer}>
                        <span className="alert__">{errors.email ? errors.email.message : ''}</span>
                        <input type="email" placeholder="Ingresa el email" {...register('email')} />
                    </div>
                    <div className={style.formsContainer}>
                        <FormControl fullWidth error={!!errors.user_job_title}>
                            <Controller name="user_job_title" control={control} render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value={0}>Seleccionar cargos</MenuItem>
                                    {
                                        jobTitles ? jobTitles.map((jobTitle) => (
                                            <MenuItem key={jobTitle.id} value={Number(jobTitle.id)}>{jobTitle.name}</MenuItem>
                                        )) : (
                                            <MenuItem key="no-job-titles-value">...</MenuItem>
                                        )
                                    }
                                </Select>
                            )}
                            />
                        </FormControl>
                    </div>
                    <div className={style.formsContainer}>
                        <FormControl fullWidth error={!!errors.user_role}>
                            <Controller name="user_role" control={control} render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value={0}>Seleccionar Roles</MenuItem>
                                    {
                                        roles ? roles.map((role) => (
                                            <MenuItem key={role.id} value={Number(role.id)}>{role.name}</MenuItem>
                                        )) : (
                                            <MenuItem key="no-role-value">...</MenuItem>
                                        )
                                    }
                                </Select>
                            )}
                            />
                        </FormControl>
                    </div>
                    <div className={style.formsContainer} data-container-buttons="true">
                        <button type="submit" className={style.formsSubmit} data-primary="true" data-icon="true">{user ? 'Modificar' : 'Crear'}</button>
                        <button type="button" className={style.formsExit} data-secondary="true" data-icon="true" onClick={handleClose}>Cerrar</button>
                    </div>
                </form>
            </Dialog >
        </>
    )
}

export default UsersForm;