import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import style from "./dashboardhome.module.css";

const DashboardHome = () => {
    return (
        <>
            {/* SECCIÓN 1 DEL CONTENIDO DEL DASHBOARD */}
            <div className={style.dashboardContainer} section-number="1">
                <div className={style.dashboardContent} section-number="1">
                    <h3>Pedidos hoy</h3>
                    <ul>
                        <li>Pendientes</li>
                        <li>En proceso</li>
                        <li>Realizados</li>
                        <li>Fallidos</li>
                    </ul>
                </div>
                <div className={style.dashboardContent} section-number="1">
                    <h3>Usuarios</h3>
                    <span>80</span>
                </div>
                <div className={style.dashboardContent} section-number="1">
                    <h3>Categorías de usuarios</h3>
                    <ul>
                        <li>Hola mundo</li>
                        <li>Hola mundo</li>
                        <li>Hola mundo</li>
                    </ul>
                </div>
            </div>

            {/* SECCIÓN 2 DE L CONTENIDO DEL DASHBOARD */}
            <div className={style.dashboardContainer} section-number="2">
                <div className={style.dashboardContent} section-number="2">
                    <h3>Facturas Recientes</h3>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableCell>Hola mundo</TableCell>
                                <TableCell>Hola mundo</TableCell>
                                <TableCell>Hola mundo</TableCell>
                                <TableCell>Hola mundo</TableCell>
                            </TableHead>
                            <TableBody>
                                <TableRow></TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={style.dashboardContent} section-number="2">
                    <h3>Hola mundo</h3>
                </div>
            </div>
        </>
    )
}
export default DashboardHome;
