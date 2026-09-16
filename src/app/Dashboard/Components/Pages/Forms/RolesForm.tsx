import style from "./cruds.forms.module.css"

interface RolesFormProps {
    id?: number,
    handleClose: () => void,
    handleSuccess: () => void,
}
const RolesForm = ({ id, handleClose, handleSuccess }: RolesFormProps) => {
    return (
        <>
            <form className={style.forms} onSubmit={console.log('click')}>
                <div className={style.formsContainer}>
                    <h1 className={style.formsTitle}>{id ? 'Editar Rol' : 'Crear Rol'}</h1>
                </div>
                <div className={style.formsContainer}>
                    <span className={"alert__"}></span>
                    <input type="text" placeholder="Ingregar código del rol" />
                </div>
                <div className={style.formsContainer}>
                    <span className={"alert__"}></span>
                    <input type="text" placeholder="Ingresar nombre del rol" />
                </div>
                <div>
                    <span className={"alert__"}></span>
                    <textarea maxLength={250} minLength={5}>Ingresa la descripción</textarea>
                </div>
                <div className={style.formsContainer} data-container-buttons="true">
                    <button className={style.formsSubmit} type="submit" data-primary="true" data-icon="true">{id ? 'Modificar' : 'Crear'}</button>
                    <button className={style.formsExit} data-secondary="true" data-icon="true" onClick={handleClose}>Cerrar</button>
                </div>
            </form >
        </>
    )
}
export default RolesForm;