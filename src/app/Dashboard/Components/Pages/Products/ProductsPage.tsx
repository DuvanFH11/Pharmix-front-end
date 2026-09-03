import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";
import type { ProductInterface } from "../../../../../interfaces/ProductInterface";
import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { index } from "../../../../../services/product.service";
import style from "./products.module.css";
import NoteAdd from '@mui/icons-material/NoteAdd';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

const ProductsPage = () => {
    const { isLoading, alertMessage, handleIndex } = useHandleFormsPages();
    const [products, setProducts] = useState<ProductInterface[] | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            setProducts(await handleIndex(index));
        }
        loadProducts();
    }, [])
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <section className="section__">
                <div className={style.productsContainer} data-container-buttons="true">
                    <button data-primary="true" data-icon="true">
                        <NoteAdd />
                        <span>Crear productos</span>
                    </button>
                    <button data-primary="true" data-icon="true">
                        <SearchOutlinedIcon />
                        <span>Buscar productos</span>
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
                                <TableCell>Unit</TableCell>
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
                                        <TableCell>{product.unit_price}</TableCell>
                                        <TableCell>{product.package_price}</TableCell>
                                        <TableCell>{product.invima_registration}</TableCell>
                                        <TableCell>{product.strength}</TableCell>
                                        <TableCell>{product.unit}</TableCell>
                                        <TableCell><button data-secondary="true" data-icon="true"><ModeEditOutlineRoundedIcon /></button></TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow key="no-products-row">
                                        <TableCell colSpan={9} className="text-center"><h6>No hay productos</h6></TableCell>
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
            {/* SECCIÓN INTERACTIVA */}
            {/* <section className="section__">
                <div className={style.productsContent}>
                    <div className={style.productsTarget}>
                        <h6>Titulo</h6>
                        <h1>1</h1>
                    </div>
                    <div className={style.productsTarget}>
                        <h6>Titulo</h6>
                        <h1>1</h1>
                    </div>
                    <div className={style.productsTarget}>
                        <h6>Titulo</h6>
                        <h1>1</h1>
                    </div>
                </div>
            </section> */}

        </>
    )


}
export default ProductsPage;