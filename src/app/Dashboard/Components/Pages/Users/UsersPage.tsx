import { useEffect, useState } from "react";
import type { UserType } from "../../../../../interfaces/UserInterface";
import { index } from "../../../../../services/user.service";
import { Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import UsersForm from "../Forms/UsersForm";
import style from "../pages..style.module.css";

const UsersPages = () => {
    const [users, setUsers] = useState<UserType[] | null>(null);
    const [pagination, setPagination] = useState<{ total: number, per_page: number, page: number }>({ total: 0, per_page: 4, page: 1 });
    const [id, setId] = useState<number | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [searchTerm, setTerm] = useState<string | undefined>(undefined);
    const { isLoading, alertMessage, handleIndex, setAlertMessage } = useHandleFormsPages();

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPagination((prev) => ({
            ...prev,
            page: newPage
        }))
    }
    const handleShowForm = (id: number | undefined) => {
        setId(id);
        setShowModal(true);
    }
    const showSuccess = () => {
        setAlertMessage({ message: 'Datos guardados con exito', success: true, time: Date.now() })
    }
    useEffect(() => {
        if (!searchTerm) {
            const loadUsers = async () => {
                const { data, total, per_page, page } = await handleIndex(index, pagination.page);
                setUsers(data);
                setPagination({ total, per_page, page });
            }
            loadUsers();
        } else {
            const timeout = setTimeout(async () => {
                const { data, total, per_page, page } = await handleIndex(index, pagination.page, searchTerm);
                setUsers(data);
                setPagination({ total, per_page, page });
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [searchTerm, handleIndex, showModal, pagination.page]);
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            <section className="section__">
                <div className={style.pagesContainer} data-title="true">
                    <h1>Usuarios</h1>
                </div>
                <div className={style.pagesContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true" onClick={() => { handleShowForm(undefined) }}>
                        <PersonAddAltRoundedIcon />
                        <span>Agregar usuario</span>
                    </button>
                    <div>
                        <input
                            className={style.pagesInputSearch}
                            type="search"
                            placeholder="Buscar usuarios por E-mail"
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
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
                <TablePagination
                    component="div"
                    page={pagination.page - 1} //Indice de la página actual, empezando en 0
                    count={pagination.total} //Número total de filas en toda la colección
                    rowsPerPage={pagination.per_page} //Cantidad de filas por página
                    rowsPerPageOptions={[]}
                    onPageChange={handleChangePage}
                />
            </section>
            <Dialog open={showModal}>
                {showModal && <UsersForm id={id} handleClose={() => { setShowModal(false) }} handleSuccess={() => { showSuccess() }} />}
            </Dialog>
        </>
    )
}
export default UsersPages;