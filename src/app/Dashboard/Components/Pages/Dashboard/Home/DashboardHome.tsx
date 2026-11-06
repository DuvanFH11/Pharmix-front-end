import { Badge } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart'
import style from "./dashboard.home.module.css";
import { useState } from "react";

const DashboardHome = () => {
    const [dataMonths, setDataMonths] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [reset, setReset] = useState<boolean>(false);
    const resetDataMonths = () => {
        setReset(prev => !prev);
        if (reset) {
            setDataMonths([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        } else {
            setDataMonths([180, 160, 120, 200, 500, 120, 114, 80, 114, 800, 126, 123]);
        }
    }
    return (
        <>
            {/* SECCIÓN 1 DEL CONTENIDO DEL DASHBOARD */}
            <div className={style.dashboardContainer} section-number="1">
                <div className={style.dashboardContent} section-number="1">
                    <h3>Pedidos semanales</h3>
                    <ul>
                        <li className={style.dashboardListItem}>
                            <Badge color="primary" variant="dot" anchorOrigin={{ horizontal: 'left' }}>Pendientes</Badge>
                            <span className="text-primary">80</span>
                        </li>
                        <li className={style.dashboardListItem}>
                            <Badge color="warning" variant="dot" anchorOrigin={{ horizontal: 'left' }}>En proceso</Badge>
                            <span className="text-warning">80</span>
                        </li>
                        <li className={style.dashboardListItem}>
                            <Badge color="success" variant="dot" anchorOrigin={{ horizontal: 'left' }}>Realizados</Badge>
                            <span className="text-success">1294</span>
                        </li>
                        <li className={style.dashboardListItem}>
                            <Badge color="error" variant="dot" anchorOrigin={{ horizontal: 'left' }}>Fallidos</Badge>
                            <span className="text-danger">20</span>
                        </li>
                    </ul>
                </div>
                <div className={style.dashboardContent} section-number="1">
                    <h3>Usuarios Activos en el sistema</h3>
                    <p className={style.dashboardCountUsers}>80</p>
                </div>
                <div className={style.dashboardContent} section-number="1">
                    <h3>Usuarios por categoría</h3>
                    <ul>
                        <li>Hola mundo</li>
                        <li>Hola mundo</li>
                        <li>Hola mundo</li>
                    </ul>
                </div>
            </div >

            {/* SECCIÓN 2 DE L CONTENIDO DEL DASHBOARD */}
            < div className={style.dashboardContainer} section-number="2" >
                <div className={style.dashboardContent} section-number="2">
                    <h3>Ventas por mes en el año 2026</h3>
                    <LineChart
                        xAxis={[{
                            data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                            scaleType: 'point'
                        }]}
                        series={[
                            {
                                data: dataMonths,
                                label: 'Cantidad de pedidos realizados y exitosos.',
                                color: '#041f50',
                                curve: 'linear',
                                showMark: true
                            }
                        ]}
                        height={200}
                        // Habilita las líneas de cuadrícula grises horizontales de fondo
                        grid={{ horizontal: true }}
                        // Hace que el gráfico responda y se adapte al tamaño de la pantalla
                        margin={{ left: 20, right: 20, top: 50, bottom: 50 }}
                    />
                </div>
                <button button-type="primary" onClick={resetDataMonths}>resetear</button>
            </div >
        </>
    )
}
export default DashboardHome;
