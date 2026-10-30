import style from "./dashboard.module.css"

const DashboardPage = () => {
    return (
        <>
            <section className="section__">
                <div className={style.dashboardContent}>
                    <div className={style.dashboardContainer}>
                        <h4>Usuarios totales</h4>
                        <span>Este es el contenido de mi target</span>
                    </div>
                    <div className={style.dashboardContainer}>
                        <h4>Ventas</h4>
                        <span>50</span>
                        <button data-primary="true">Nuevo pedido</button>
                    </div>
                    <div className={style.dashboardContainer}>
                        <h4>Egresos</h4>
                        <span>50</span>
                        <button data-primary="true">Gestionar pedidos</button>
                    </div>
                </div>
            </section>
            <section className="section__">
                <div className={style.dashboardContent}>
                    <div className={style.dashboardContainer}>
                        <h4>Productos en Stock</h4>
                    </div>
                    <div className={style.dashboardContainer}>
                        <h4>Pedidos activos</h4>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashboardPage;