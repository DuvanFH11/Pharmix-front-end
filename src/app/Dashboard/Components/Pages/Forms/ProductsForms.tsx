import { useEffect } from "react";
import type { FormsProps } from "../../../../../interfaces/FormsPropsInterface";
import style from "./cruds.forms.module.css";
import useHandleFormsPages from "../../../../../hooks/useHandleFormsPages";
import { show, storeOrUpdate } from "../../../../../services/product.service";
import { useForm } from "react-hook-form";
import type { ProductStoreSchema } from "../../../../../schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import productStoreSchema from "../../../../../schemas/product.schema";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../../../../components/AlertMessage/AlertMessage";

const ProductsForm = ({ id, handleClose, handleSuccess }: FormsProps) => {
    const { handleShow, handleSave, isLoading, alertMessage } = useHandleFormsPages();

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<ProductStoreSchema>({
        resolver: zodResolver(productStoreSchema),
    })

    const onSubmitForm = handleSubmit(async (data) => {
        const success = await handleSave(storeOrUpdate, data, id);
        if (success) {
            handleClose();
            handleSuccess();
        }
    })

    useEffect(() => {
        const loadProduct = async () => {
            if (id) {
                const data = await handleShow(show, id);
                if (data) {
                    setValue('name', data.name);
                    setValue('brand', data.brand);
                    setValue('unit_price', data.unit_price);
                    setValue('package_price', data.package_price);
                    setValue('invima_registration', data.invima_registration);
                    setValue('strength', data.strength);
                    setValue('unit', data.unit);
                }
            }
        };
        loadProduct();
    }, [handleShow, id, setValue])

    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <form className={style.forms} onSubmit={onSubmitForm}>
                <div className={style.formsContainer}>
                    <h1 className={style.formsTitle}>{id ? 'Editar Producto' : 'Crear Producto'}</h1>
                </div>

                <div className={style.formsContainer} data-container-duo="true">
                    <div className={style.formsSubContainer}>
                        <span className={"alert__"}>{errors.name && errors.name.message}</span>
                        <input type="text" placeholder="Nombre del producto" {...register('name')} />
                    </div>
                    <div className={style.formsSubContainer}>
                        <span className={"alert__"}>{errors.brand && errors.brand.message}</span>
                        <input type="text" placeholder="Nombre de la marca" {...register('brand')} />
                    </div>
                </div>

                <div className={style.formsContainer} data-container-duo="true">
                    <span className={"alert__"}>{errors.invima_registration && errors.invima_registration.message}</span>
                    <input type="text" placeholder="Registro del invima" {...register('invima_registration')} />
                </div>
                <div className={style.formsContainer} data-container-duo="true">
                    <div className={style.formsSubContainer}>
                        <span className={"alert__"}>{errors.package_price && errors.package_price.message}</span>
                        <input type="number" placeholder="Precio por unidad" {...register('unit_price')} /><br />
                    </div>

                    <div className={style.formsSubContainer}>
                        <span className={"alert__"}>{errors.unit_price && errors.unit_price.message}</span>
                        <input type="number" placeholder="Precio por paquete" {...register('package_price')} />
                    </div>
                </div>

                <div className={style.formsContainer} data-container-duo="true">
                    <div className={style.formsSubContainer}>
                        <span className="alert__">{errors.strength && errors.strength.message}</span>
                        <input type="number" placeholder="Cantidad de principio" {...register('strength')} /><br />
                    </div>
                    <div className={style.formsSubContainer}>
                        <span className="alert__">{errors.unit && errors.unit.message}</span>
                        <input type="text" placeholder="Unidad de medida" {...register('unit')} />
                    </div>
                </div>

                <div className={style.formsContainer}>
                    <span className={"alert__"}>{errors.description && errors.description.message}</span>
                    <textarea maxLength={250} minLength={5} {...register('description')} placeholder="Descripción" />
                </div>
                <div className={style.formsContainer} data-container-buttons="true">
                    <button type="submit" className={style.formsSubmit} data-primary="true" data-icon="true">{id ? "Modificar" : "Crear"}</button>
                    <button type="button" className={style.formsExit} data-secondary="true" data-icon="true" onClick={handleClose}>Cerrar</button>
                </div>
            </form >
        </>
    )
}
export default ProductsForm;