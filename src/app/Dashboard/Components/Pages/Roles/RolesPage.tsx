import { useEffect, useState } from "react";
import type { roleInterface } from "../../../../../interfaces/RoleInterface";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { index } from "../../../../../services/role.service";
import NoteAdd from '@mui/icons-material/NoteAdd';
import RolesForm from "../Forms/RolesForm";
import style from "../pages..style.module.css";

const RolesPage = () => {
    const [roles, setRoles] = useState<roleInterface[] | null>(null);
    const [pagination, setPagination] = useState<{ total: number, per_page: number, page: number }>({ total: 0, per_page: 4, page: 0 });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [id, setId] = useState<number | undefined>(undefined);
    const { isLoading, alertMessage, handleIndex, setAlertMessage } = useHandleFormsPages();
    const [searchTerm, setTerm] = useState<string | undefined>(undefined);

    const handleShowForm = (id: number | undefined) => {
        setId(id);
        setShowModal(true);
    }
    const showSuccess = () => {
        setAlertMessage({ message: 'Datos guardados correctamente', success: true, time: Date.now() });
    }

    useEffect(() => {
        if (!searchTerm) {
            const loadRoles = async () => {
                const { data, total, per_page, page } = await handleIndex(index, pagination.page);
                setRoles(data);
                setPagination({ total, per_page, page: page - 1 });
            };
            loadRoles();
        } else {
            const timeout = setTimeout(async () => {
                const { data, total, per_page, page } = await handleIndex(index, pagination.page, searchTerm);
                setRoles(data);
                setPagination({ total, per_page, page: page - 1 });
            }, 600)
            return () => clearTimeout(timeout);
        }
    }, [handleIndex, showModal, searchTerm, pagination.page])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            <section className="section__">
                <div className={style.pagesContainer} data-title="true">
                    <h1>Roles</h1>
                </div>
                <div className={style.pagesContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true" onClick={() => { handleShowForm(undefined) }}>
                        <NoteAdd />
                        <span>Agregar Rol</span>
                    </button>
                    <div>
                        <input
                            className={style.pagesInputSearch}
                            type="search"
                            placeholder="Buscar roles por código"
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                roles ? roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>{role.id}</TableCell>
                                        <TableCell>{role.code}</TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell>{role.description}</TableCell>
                                        <TableCell><button data-secondary="true" data-icon="true" onClick={() => { handleShowForm(role.id) }}><ModeEditOutlineRoundedIcon /></button></TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow key="no-role-row">
                                        <TableCell colSpan={5}><h6>No hay roles</h6></TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    page={pagination.page}
                    rowsPerPage={pagination.per_page}
                    count={pagination.total}
                    onPageChange={console.log}
                    rowsPerPageOptions={[]}
                />
            </section>
            <Dialog open={showModal}>
                {showModal && <RolesForm id={id} handleClose={() => { setShowModal(false) }} handleSuccess={() => { showSuccess() }} />}
            </Dialog>
        </>
    )
}
export default RolesPage;