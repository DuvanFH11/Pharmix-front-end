import { useEffect, useState } from "react";
import style from "./users.module.css";
import type { UserType } from "../../../../../interfaces/UserInterface";
import { index } from "../../../../../services/user.service";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import UsersForm from "../Forms/UsersForm";

const UsersPages = () => {
    const [users, setUsers] = useState<UserType[] | null>(null);
    const [id, setId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const { isLoading, alertMessage, handleIndex } = useHandleFormsPages();

    const handleShowForm = (id: number | null) => {
        setId(id);
        setShowForm(true);
    }
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
            {showForm && <UsersForm id={id} handleClose={() => { setShowForm(false) }} />}
            <section className="section__">
                <div className={style.usersContainer} data-container-buttons="true">
                    <div>
                        <input type="search" placeholder="Buscar Usuario" /*onChange={handleSearch} */ />
                    </div>
                    <button data-primary="true" data-icon="true" onClick={() => { handleShowForm(null) }}>
                        <PersonAddAltRoundedIcon />
                        <span>Agregar usuario</span>
                    </button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>User Creator</TableCell>
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
                                        <TableCell>{user.user_job_title.name}</TableCell>
                                        <TableCell>{user.user_role.name}</TableCell>
                                        <TableCell>{user.user_creator ? user.user_creator : 'N/A'}</TableCell>
                                        <TableCell><button data-secondary="true" data-icon="true" onClick={() => { handleShowForm(user.id) }}><ModeEditOutlineRoundedIcon /></button></TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow key='no-users-row'>
                                        <TableCell colSpan={7}><h6>No hay usuarios</h6></TableCell>
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
        </>
    )
}
export default UsersPages;