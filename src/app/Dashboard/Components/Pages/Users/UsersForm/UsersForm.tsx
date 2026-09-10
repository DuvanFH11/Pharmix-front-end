import { useEffect, useState } from "react";
import type { UserType } from "../../../../../../interfaces/UserInterface";
import useHandleFormsPages from "../../../../../../hooks/useHandleFormsPages";
import { show } from "../../../../../../services/user.service";
import LoadingComponent from "../../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../../components/AlertMessage/AlertMessage";
import { Dialog } from "@mui/material";
import type { roleInterface } from "../../../../../../interfaces/RoleInterface";
import type { AppointmentInterface } from "../../../../../../interfaces/AppointmentInterface";
import { index as appointmentIndex } from "../../../../../../services/appointment.service";
import { index as rolesIndex } from "../../../../../../services/role.service";


interface UsersFormProps {
    id: number | null;
    handleClose: () => void
}

const UsersForm = ({ id, handleClose }: UsersFormProps) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [roles, setRoles] = useState<roleInterface[] | null>(null);
    const [appointments, setAppointments] = useState<AppointmentInterface[] | null>(null);
    const { handleShow, handleIndex, isLoading, alertMessage } = useHandleFormsPages();
    useEffect(() => {
        const loadValues = async () => {
            setAppointments(await handleIndex(appointmentIndex));
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
                <h1>{id ? "Editar Usuario" : "Crear usuario"}</h1>
                <form>
                    <div>
                        <input type="text" placeholder="Ingresa el nombre" defaultValue={user ? user.name : ''} />
                    </div>
                    <div>
                        <input type="email" placeholder="Ingresa el email" defaultValue={user ? user.email : ''} />
                    </div>
                    <div>
                        <select name="appointment" value={user?.user_appointment.id}>
                            <option>seleccionar cargo</option>
                            {
                                appointments ? appointments.map((appointment) => (
                                    <option key={appointment.id} value={appointment.id}>{appointment.name}</option>
                                )) : (
                                    <option key="no-appointment-value">...</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <select name="roles" value={user?.user_role.id}>
                            <option>seleccionar rol</option>
                            {
                                roles ? roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                )) : (
                                    <option key="no-role-value">...</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <button data-primary="true" data-icon="true" onClick={handleClose}>Cerrar</button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default UsersForm;