import { useEffect, useState } from "react";
import style from "./users.module.css";
import type { UserType } from "../../../../../interfaces/UserInterface";
import { index } from "../../../../../services/user.service";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

const UsersPages = () => {
    const [users, setUsers] = useState<UserType[] | null>(null);
    const { isLoading, alertMessage, handleIndex } = useHandleFormsPages();

    useEffect(() => {
        const loadUsers = async () => {
            setUsers(await handleIndex(index));
        }
        loadUsers();
    }, [])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <section className="section__">
                <div className={style.usersContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true">
                        <PersonAddAltRoundedIcon />
                        <span>Agregar usuario</span>
                    </button>
                    <button data-primary="true" data-icon="true">
                        <PersonSearchRoundedIcon />
                        <span>Buscar usuario</span>
                    </button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Appointment</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users ? users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.user_appointment.name}</TableCell>
                                        <TableCell>{user.user_role.name}</TableCell>
                                        <TableCell><button data-secondary="true" data-icon="true"><ModeEditOutlineRoundedIcon /></button></TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow key='no-users-row'>
                                        <TableCell colSpan={7} className="text-center"><h6>No hay usuarios</h6></TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={style.usersContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true">
                        <TimelineOutlinedIcon />
                        <span>Ver estadisticas</span>
                    </button>
                </div>
            </section>
            {/* SECCIÓN INTERACTIVA */}
            {/* <section className="section__">
                <div className={style.usersContent}>
                    <div className={style.usersTarget}>
                        <h6>Usuarios totales</h6>
                        <span>10000</span>
                    </div>
                    <div className={style.usersTarget}>
                        <h6></h6>
                        <span>1</span>
                    </div>
                    <div className={style.usersTarget}>
                        <h6>Title</h6>
                        <span>1</span>
                    </div>
                </div>
            </section > */}
        </>
    )
}
export default UsersPages;