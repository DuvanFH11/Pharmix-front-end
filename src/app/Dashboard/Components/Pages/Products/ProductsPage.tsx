import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import type { ProductInterface } from "../../../../../interfaces/ProductInterface";
import { useEffect, useState } from "react";
import { Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { index } from "../../../../../services/product.service";
import NoteAdd from '@mui/icons-material/NoteAdd';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import ProductsForm from "../Forms/ProductsForms";
import style from "../pages..style.module.css";

const ProductsPage = () => {
    const { isLoading, alertMessage, handleIndex, setAlertMessage } = useHandleFormsPages();
    const [id, setId] = useState<number | undefined>(undefined);
    const [products, setProducts] = useState<ProductInterface[] | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [searchTerm, setTerm] = useState<string | undefined>(undefined);

    const showSuccess = () => {
        setAlertMessage({ message: 'Datos guardados con exito', success: true, time: Date.now() });
    }
    const handleShowForm = (id: number | undefined) => {
        setId(id);
        setShowModal(true);
    }
    useEffect(() => {
        if (!searchTerm) {
            const loadProducts = async () => {
                setProducts(await handleIndex(index));
            }
            loadProducts();
        } else {
            const timeout = setTimeout(async () => {
                setProducts(await handleIndex(index, searchTerm));
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [searchTerm, handleIndex, showModal])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <section className="section__">
                <div className={style.pagesContainer} data-title="true">
                    <h1>Productos</h1>
                </div>
                <div className={style.pagesContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true" onClick={() => { handleShowForm(undefined) }}>
                        <NoteAdd />
                        <span>Agregar producto</span>
                    </button>
                    <div>
                        <input
                            className={style.pagesInputSearch}
                            type="search"
                            placeholder="Buscar productos por nombre o registro"
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
                                <TableCell>Brand</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Package Price</TableCell>
                                <TableCell>Invima Registration</TableCell>
                                <TableCell>Strength</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                products ? products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.brand}</TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                                minimumFractionDigits: 0
                                            }).format(product.unit_price)}
                                        </TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                                minimumFractionDigits: 0
                                            }).format(product.package_price)}
                                        </TableCell>
                                        <TableCell>{product.invima_registration}</TableCell>
                                        <TableCell>{Number(product.strength)}{product.unit}</TableCell>
                                        <TableCell><button data-secondary="true" data-icon="true" onClick={() => { handleShowForm(product.id) }}><ModeEditOutlineRoundedIcon /></button></TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow key="no-products-row">
                                        <TableCell colSpan={9}><h6>No hay productos</h6></TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={style.pagesContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true">
                        <TimelineOutlinedIcon />
                        <span>Ver estadisticas</span>
                    </button>
                </div>
            </section >
            <Dialog open={showModal}>
                {showModal && <ProductsForm id={id} handleClose={() => setShowModal(false)} handleSuccess={() => showSuccess()} />}
            </Dialog>
        </>
    )
}
export default ProductsPage;