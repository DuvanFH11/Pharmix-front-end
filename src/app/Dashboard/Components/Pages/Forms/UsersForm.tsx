import { useEffect, useState } from "react";
import type { UserType } from "../../../../../interfaces/UserInterface";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import { show } from "../../../../../services/user.service";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import { Dialog, MenuItem, Select } from "@mui/material";
import type { JobTitleInterface } from "../../../../../interfaces/JobTitleInterface";
import type { roleInterface } from "../../../../../interfaces/RoleInterface";
import { index as rolesIndex } from "../../../../../services/role.service";
import { index as jobTitlesIndex } from "../../../../../services/job.title.service";
import style from './cruds.forms.module.css';

interface UsersFormProps {
    id: number | null;
    handleClose: () => void
}

const UsersForm = ({ id, handleClose }: UsersFormProps) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [roles, setRoles] = useState<roleInterface[] | null>(null);
    const [jobTitles, setJobTitles] = useState<JobTitleInterface[] | null>(null);

    const { handleShow, handleIndex, isLoading, alertMessage } = useHandleFormsPages();
    useEffect(() => {
        const loadValues = async () => {
            setJobTitles(await handleIndex(jobTitlesIndex));
            setRoles(await handleIndex(rolesIndex));
        }
        loadValues();
    }, []);
    useEffect(() => {
        const loadUser = async () => {
            if (id) {
                const data = await handleShow(show, id);
                setUser(data);
            }
        };
        loadUser();
    }, [id]);
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            <Dialog open={true}>
                <form className={style.forms}>
                    <div className={style.formsContainer}>
                        <h2 className={style.formsTitle}>{id ? "Editar Usuario" : "Crear usuario"}</h2>
                    </div>
                    <div className={style.formsContainer}>
                        <span className="alert__"></span>
                        <input type="text" placeholder="Ingresa el nombre" defaultValue={user ? user.name : ''} />
                    </div>
                    <div className={style.formsContainer}>
                        <span className="alert__"></span>
                        <input type="email" placeholder="Ingresa el email" defaultValue={user ? user.email : ''} />
                    </div>
                    <div className={style.formsContainer}>
                        <Select name="appointment" /*defaultValue={user?.user_appointment.id}*/>
                            {
                                jobTitles ? jobTitles.map((jobTitle) => (
                                    <MenuItem key={jobTitle.id} value={jobTitle.id}>{jobTitle.name}</MenuItem>
                                )) : (
                                    <MenuItem key="no-job-titles-value">...</MenuItem>
                                )
                            }
                        </Select>
                    </div>
                    <div className={style.formsContainer}>
                        <Select name="roles" /*defaultValue={user?.user_role.id}*/>
                            {
                                roles ? roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                )) : (
                                    <MenuItem key="no-role-value">...</MenuItem>
                                )
                            }
                        </Select>
                    </div>
                    <div className={style.formsContainer} data-container-buttons="true">
                        <button className={style.formsSubmit} data-primary="true" data-icon="true" onClick={handleClose}>{user ? 'Modificar' : 'Crear'}</button>
                        <button className={style.formsExit} data-secondary="true" data-icon="true" onClick={handleClose}>Cerrar</button>
                    </div>
                </form>
            </Dialog >
        </>
    )
}

export default UsersForm;