import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import type { ProductInterface } from "../../../../../interfaces/ProductInterface";
import { useEffect, useState } from "react";
import { Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { index } from "../../../../../services/product.service";
import style from "./products.module.css";
import NoteAdd from '@mui/icons-material/NoteAdd';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import ProductsForm from "../Forms/ProductsForms";

const ProductsPage = () => {
    const { isLoading, alertMessage, handleIndex, setAlertMessage } = useHandleFormsPages();
    const [id, setId] = useState<number | undefined>(undefined);
    const [products, setProducts] = useState<ProductInterface[] | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const showSuccess = () => {
        setAlertMessage({ message: 'Datos guardados con exito', success: true, time: Date.now() });
    }
    const handleShowForm = (id: number | undefined) => {
        setId(id);
        setShowModal(true);
    }
    useEffect(() => {
        const loadProducts = async () => {
            setProducts(await handleIndex(index));
        }
        loadProducts();
    }, [handleIndex, showModal])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <section className="section__">
                <div className={style.productsContainer} data-container-buttons="true">
                    <div>
                        <input type="search" placeholder="Buscar productos" />
                    </div>
                    <button data-primary="true" data-icon="true" onClick={() => { handleShowForm(undefined) }}>
                        <NoteAdd />
                        <span>Agregar producto</span>
                    </button>
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
                <div className={style.productsContainer} data-container-buttons="true">
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