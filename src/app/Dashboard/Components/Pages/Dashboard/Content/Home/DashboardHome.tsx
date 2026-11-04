import { Badge } from "@mui/material";
import style from "./dashboardhome.module.css";

const DashboardHome = () => {
    return (
        <>
            {/* SECCIÓN 1 DEL CONTENIDO DEL DASHBOARD */}
            <div className={style.dashboardContainer} section-number="1">
                <div className={style.dashboardContent} section-number="1">
                    <h3>Pedidos hoy</h3>
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
                    <h3>Usuarios</h3>
                    <p className={style.dashboardCountUsers}>80</p>
                </div>
                <div className={style.dashboardContent} section-number="1">
                    <h3>Categorías de usuarios</h3>
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
                    <h3>Ventas mensuales</h3>

                </div>
                <div className={style.dashboardContent} section-number="2">
                    <h3>Hola mundo</h3>
                </div>
            </div >
        </>
    )
}
export default DashboardHome;
