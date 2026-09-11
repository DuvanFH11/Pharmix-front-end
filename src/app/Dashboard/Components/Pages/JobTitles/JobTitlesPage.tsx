import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { JobTitleInterface } from "../../../../../interfaces/JobTitleInterface";
import { useEffect, useState } from "react";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import { index } from "../../../../../services/job.title.service";
import style from "./job.titles.module.css";
import NoteAdd from '@mui/icons-material/NoteAdd';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';

const JobTitlesPage = () => {
    const [jobTitles, setJobTitles] = useState<JobTitleInterface[] | null>(null);
    const { isLoading, alertMessage, handleIndex } = useHandleFormsPages();
    useEffect(() => {
        const loadAppoinments = async () => {
            setJobTitles(await handleIndex(index));
        }
        loadAppoinments();
    }, [handleIndex]);
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <section className="section__">
                <div className={style.jobTitlesContainer} data-container-buttons="true">
                    <div>
                        <input type="search" placeholder="Buscar Cargo" />
                    </div>
                    <button data-primary="true" data-icon="true">
                        <NoteAdd />
                        <span>Agregar Cargo</span>
                    </button>
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
                                    <TableCell><button data-secondary="true" data-icon="true"><ModeEditOutlineRoundedIcon /></button></TableCell>
                                </TableRow>
                            )) : (
                                <TableRow key="no-job-titles-row">
                                    <TableCell colSpan={5}><h6>No hay cargos</h6></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={style.jobTitlesContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true">
                        <TimelineOutlinedIcon />
                        <span>Ver estadisticas</span>
                    </button>
                </div>
            </section>
        </>
    )
}

export default JobTitlesPage;