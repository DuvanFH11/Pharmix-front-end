import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import style from "./dashboard.request.module.css";

/* Datos de ejemplo: reemplazar por los servicios y hooks reales. */
const summaryCards = [
    {
        label: 'En proceso',
        value: '12',
        detail: '3 con más de 24 h',
        tone: 'process',
        icon: <PendingActionsOutlinedIcon />
    },
    {
        label: 'Realizados',
        value: '128',
        detail: '+18 esta semana',
        tone: 'completed',
        icon: <CheckCircleOutlinedIcon />
    },
    {
        label: 'Fallidos',
        value: '4',
        detail: 'Requieren revisión',
        tone: 'failed',
        icon: <ErrorOutlineRoundedIcon />
    },
    {
        label: 'Total del mes',
        value: '144',
        detail: 'Pedidos registrados',
        tone: 'total',
        icon: <ReceiptLongOutlinedIcon />
    }
];

const demoOrders: {
    id: string;
    client: string;
    date: string;
    total: string;
    status: 'en-proceso' | 'realizado' | 'fallido';
    statusLabel: string;
}[] = [
    {
        id: '#PED-1048',
        client: 'Farmacia San Rafael',
        date: '17 nov 2026',
        total: '$1.240.000',
        status: 'en-proceso',
        statusLabel: 'En proceso'
    },
    {
        id: '#PED-1047',
        client: 'Droguería La Salud',
        date: '17 nov 2026',
        total: '$860.500',
        status: 'realizado',
        statusLabel: 'Realizado'
    },
    {
        id: '#PED-1046',
        client: 'Distribuciones Andinas',
        date: '16 nov 2026',
        total: '$2.410.000',
        status: 'realizado',
        statusLabel: 'Realizado'
    },
    {
        id: '#PED-1045',
        client: 'Farmacia Central',
        date: '16 nov 2026',
        total: '$430.000',
        status: 'fallido',
        statusLabel: 'Fallido'
    },
    {
        id: '#PED-1044',
        client: 'Botica del Norte',
        date: '15 nov 2026',
        total: '$1.980.000',
        status: 'en-proceso',
        statusLabel: 'En proceso'
    }
];

const demoItems = [
    { name: 'Acetaminofén 500 mg', quantity: 2, price: '$18.000' },
    { name: 'Ibuprofeno 400 mg', quantity: 1, price: '$12.500' }
];

const DashboardRequest = () => {
    return (
        <>
            <header className={style.pageHeader}>
                <div>
                    <span className={style.eyebrow}>Pedidos</span>
                    <h1 className={style.pageTitle}>Gestión de pedidos</h1>
                    <p className={style.pageDescription}>
                        Registra pedidos telefónicos, agrega los productos solicitados y consulta el estado
                        de cada orden en un solo lugar.
                    </p>
                </div>
                <button type="button" button-type="primary" className={style.headerCta}>
                    <AddIcon />
                    <span>Nuevo pedido</span>
                </button>
            </header>

            <section className={style.statsGrid} aria-label="Resumen de pedidos">
                {summaryCards.map((card) => (
                    <article key={card.label} className={style.statCard} data-tone={card.tone}>
                        <div className={style.statIcon}>{card.icon}</div>
                        <div>
                            <p className={style.statLabel}>{card.label}</p>
                            <p className={style.statValue}>{card.value}</p>
                            <span className={style.statDetail}>{card.detail}</span>
                        </div>
                    </article>
                ))}
            </section>

            <div className={style.requestLayout}>
                <section className={style.orderForm} aria-labelledby="new-order-title">
                    <div className={style.formHeader}>
                        <h2 id="new-order-title">Nuevo pedido</h2>
                        <p>Completa los datos del cliente y agrega los productos del pedido.</p>
                    </div>

                    <form>
                        <div className={style.formGrid}>
                            <div className={style.field}>
                                <label htmlFor="order-client">Cliente</label>
                                <input id="order-client" type="text" placeholder="Nombre o razón social" />
                            </div>
                            <div className={style.field}>
                                <label htmlFor="order-document">Documento / NIT</label>
                                <input id="order-document" type="text" placeholder="Número de documento" />
                            </div>
                            <div className={style.field}>
                                <label htmlFor="order-phone">Teléfono</label>
                                <input id="order-phone" type="tel" placeholder="Número de contacto" />
                            </div>
                            <div className={`${style.field} ${style.fieldFull}`}>
                                <label htmlFor="order-address">Dirección de entrega</label>
                                <input id="order-address" type="text" placeholder="Dirección del cliente" />
                            </div>
                        </div>

                        <fieldset className={style.itemsFieldset}>
                            <legend>Productos del pedido</legend>
                            <div className={style.itemAdder}>
                                <select aria-label="Seleccionar producto" defaultValue="">
                                    <option value="" disabled>Selecciona un producto</option>
                                    <option value="acetaminofen">Acetaminofén 500 mg</option>
                                    <option value="ibuprofeno">Ibuprofeno 400 mg</option>
                                    <option value="amoxicilina">Amoxicilina 500 mg</option>
                                    <option value="loratadina">Loratadina 10 mg</option>
                                </select>
                                <input type="number" min={1} placeholder="Cant." aria-label="Cantidad" />
                                <button type="button" button-type="icon" aria-label="Agregar producto">
                                    <AddCircleOutlineRoundedIcon />
                                </button>
                            </div>

                            <div className={style.itemList}>
                                {demoItems.map((item) => (
                                    <div key={item.name} className={style.itemRow}>
                                        <span>{item.name}</span>
                                        <span>x{item.quantity}</span>
                                        <span>{item.price}</span>
                                        <button type="button" button-type="icon" aria-label={`Quitar ${item.name}`}>
                                            <DeleteOutlineRoundedIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </fieldset>

                        <div className={style.formGrid}>
                            <div className={style.field}>
                                <label htmlFor="order-payment">Método de pago</label>
                                <select id="order-payment" defaultValue="efectivo">
                                    <option value="efectivo">Efectivo</option>
                                    <option value="transferencia">Transferencia</option>
                                    <option value="credito">Crédito</option>
                                </select>
                            </div>
                            <div className={`${style.field} ${style.fieldFull}`}>
                                <label htmlFor="order-notes">Observaciones</label>
                                <textarea id="order-notes" placeholder="Indicaciones de entrega, horarios o notas adicionales" />
                            </div>
                        </div>

                        <div className={style.summary}>
                            <div><span>Subtotal</span><span>$30.500</span></div>
                            <div><span>IVA (19%)</span><span>$5.795</span></div>
                            <div className={style.summaryTotal}><span>Total</span><span>$36.295</span></div>
                        </div>

                        <div className={style.formActions}>
                            <button type="button" button-type="ghost">Limpiar</button>
                            <button type="submit" button-type="primary">
                                <ShoppingCartOutlinedIcon />
                                <span>Registrar pedido</span>
                            </button>
                        </div>
                    </form>
                </section>

                <section className={style.ordersPanel} aria-labelledby="orders-list-title">
                    <div className={style.panelHeader}>
                        <div>
                            <h2 id="orders-list-title">Pedidos recientes</h2>
                            <p>Seguimiento de las órdenes registradas en el sistema.</p>
                        </div>
                        <div className={style.panelActions}>
                            <div className={style.searchBox}>
                                <SearchIcon />
                                <input type="search" placeholder="Buscar pedido o cliente" aria-label="Buscar pedido" />
                            </div>
                            <select className={style.statusFilter} defaultValue="todos" aria-label="Filtrar por estado">
                                <option value="todos">Todos los estados</option>
                                <option value="en-proceso">En proceso</option>
                                <option value="realizado">Realizados</option>
                                <option value="fallido">Fallidos</option>
                            </select>
                        </div>
                    </div>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pedido</TableCell>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Detalle</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {demoOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.client}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.total}</TableCell>
                                        <TableCell>
                                            <span className={style.statusPill} data-status={order.status}>
                                                {order.statusLabel}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                type="button"
                                                button-type="icon"
                                                aria-label={`Ver detalle del pedido ${order.id}`}
                                            >
                                                <VisibilityOutlinedIcon />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className={style.panelFooter}>
                        <span>Mostrando 5 de 144 pedidos</span>
                        <Pagination count={3} color="primary" shape="rounded" size="small" />
                    </div>
                </section>
            </div>

            <aside className={style.formAside}>
                <LocalShippingOutlinedIcon />
                <div>
                    <strong>Los pedidos nuevos inician en estado “En proceso”.</strong>
                    <p>Al confirmar el pago y el envío podrás marcarlos como realizados o fallidos.</p>
                </div>
            </aside>
        </>
    );
};

export default DashboardRequest;
