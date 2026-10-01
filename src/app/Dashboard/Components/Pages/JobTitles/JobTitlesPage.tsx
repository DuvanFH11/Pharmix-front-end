import { Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import type { JobTitleInterface } from "../../../../../interfaces/JobTitleInterface";
import { useEffect, useState } from "react";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import { index } from "../../../../../services/job.title.service";
import NoteAdd from '@mui/icons-material/NoteAdd';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import JobTitlesForm from "../Forms/JobTitlesForm";
import style from "../pages..style.module.css";

const JobTitlesPage = () => {
    const [jobTitles, setJobTitles] = useState<JobTitleInterface[] | null>(null);
    const [pagination, setPagination] = useState<{ total: number, per_page: number }>({ total: 0, per_page: 4 });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [id, setId] = useState<number | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [searchTerm, setTerm] = useState<string | undefined>(undefined);

    const { isLoading, alertMessage, handleIndex, setAlertMessage } = useHandleFormsPages();

    const handleShowForm = (id: number | undefined) => {
        setShowModal(true);
        setId(id);
    }
    const showSuccess = () => {
        setAlertMessage({ message: 'Datos guardados correctamente', success: true, time: Date.now() });
        setRefresh(prev => !prev);
    }

    useEffect(() => {
        if (!searchTerm) {
            const loadAppoinments = async () => {
                const { data, total, per_page } = await handleIndex(index, currentPage);
                setJobTitles(data);
                setPagination({ total, per_page });
            }
            loadAppoinments();
        } else {
            const timeout = setTimeout(async () => {
                const { data, total, per_page } = await handleIndex(index, currentPage, searchTerm);
                setJobTitles(data);
                setPagination({ total, per_page });
            }, 600)
            return () => clearTimeout(timeout);
        }
    }, [handleIndex, searchTerm, currentPage, refresh]);

    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <section className="section__">
                <div className={style.pagesContainer} data-title="true">
                    <h1>Cargos</h1>
                </div>
                <div className={style.pagesContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true" onClick={() => { handleShowForm(undefined) }}>
                        <NoteAdd />
                        <span>Agregar Cargo</span>
                    </button>
                    <div>
                        <input
                            className={style.pagesInputSearch}
                            type="search"
                            placeholder="Buscar cargo por código"
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                </div>
                <TableContainer component={Paper}>
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
                            {jobTitles ? jobTitles.map((jobTitle) => (
                                <TableRow key={jobTitle.id}>
                                    <TableCell>{jobTitle.id}</TableCell>
                                    <TableCell>{jobTitle.code}</TableCell>
                                    <TableCell>{jobTitle.name}</TableCell>
                                    <TableCell>{jobTitle.description}</TableCell>
                                    <TableCell><button data-secondary="true" data-icon="true" onClick={() => { handleShowForm(jobTitle.id) }}><ModeEditOutlineRoundedIcon /></button></TableCell>
                                </TableRow>
                            )) : (
                                <TableRow key="no-job-titles-row">
                                    <TableCell colSpan={5}><h6>No hay cargos</h6></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    page={currentPage - 1}
                    rowsPerPage={pagination.per_page}
                    count={pagination.total}
                    rowsPerPageOptions={[]}
                    onPageChange={(event, newPage) => setCurrentPage(newPage + 1)}
                />
            </section>
            <Dialog open={showModal}>
                <JobTitlesForm id={id} handleClose={() => setShowModal(false)} handleSuccess={() => showSuccess()} />
            </Dialog>
        </>
    )
}

export default JobTitlesPage;