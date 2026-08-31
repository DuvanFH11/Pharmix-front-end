import { useEffect, useState } from "react";
import style from "./users.module.css";
import type { UserInterface } from "../../../../../interfaces/UserInterface";
import { index } from "../../../../../services/user.service";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
const UsersPages = () => {
    const [users, setUsers] = useState<UserInterface[] | null>(null);
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
                <div className={style.usersContentTable}>
                    <div className={style.usersContainer}>
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
                                                <TableCell><button data-secondary="true">Editar</button></TableCell>
                                            </TableRow>
                                        )) :
                                            <TableRow key='no-users-row'>
                                                <TableCell colSpan={7} className="text-center"><h6>No hay usuarios</h6></TableCell>
                                            </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div >
            </section>
            <section className="section__">
                <div className={style.usersContent}>
                    <div className={style.usersContainer}>
                        <form className={style.formsUsers}>
                            <h2>Crear usuarios</h2>
                            <div className={style.usersFormContainer}>
                                <input type="text" placeholder="Ingresa el nombre" />
                            </div>
                            <div className={style.usersFormContainer}>
                                <input type="text" placeholder="Ingresa el email" />
                            </div>
                            <div className={style.usersFormContainer}>
                                <input type="text" placeholder="Ingresa el cargo" />
                            </div>
                            <div className={style.usersFormContainer} data-container-btn="true">
                                <button type="submit" data-primary="true">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
export default UsersPages;