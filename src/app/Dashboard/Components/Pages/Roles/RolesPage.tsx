import { useEffect, useState } from "react";
import type { roleInterface } from "../../../../../interfaces/RoleInterface";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { index } from "../../../../../services/role.service";
import style from "./roles.module.css";
import NoteAdd from '@mui/icons-material/NoteAdd';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
const RolesPage = () => {
    const [roles, setRoles] = useState<roleInterface[] | null>(null);
    const { isLoading, alertMessage, handleIndex } = useHandleFormsPages();

    useEffect(() => {
        const loadRoles = async () => {
            setRoles(await handleIndex(index));
        };
        loadRoles();
    }, [])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}
            <section className="section__">
                <div className={style.rolesContainer} data-container-buttons="true">
                    <div>
                        <input type="search" placeholder="Buscar Rol" />
                    </div>
                    <button data-primary="true" data-icon="true">
                        <NoteAdd />
                        <span>Agregar Rol</span>
                    </button>
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
                                        <TableCell><button data-secondary="true" data-icon="true"><ModeEditOutlineRoundedIcon /></button></TableCell>
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
                <div className={style.rolesContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true">
                        <TimelineOutlinedIcon />
                        <span>Ver estadísticas</span>
                    </button>
                </div>
            </section>
        </>
    )
}


export default RolesPage;