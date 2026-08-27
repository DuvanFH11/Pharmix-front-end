import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import style from './access.module.css';
import { useHandleForm } from "../../hooks/useHandleForms";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { create } from "../../services/user.service";
import { registerSchema, type RegisterSchema } from "../../schemas/user.schema";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    })

    const { submitFormRegister, alertMessage, isLoading } = useHandleForm();
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} state={alertMessage.state} time={alertMessage.time} />}

            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <form className={style.access} onSubmit={handleSubmit((data) => { submitFormRegister(create, data) })}>
                    <div className={style.accessContainer}>
                        <h1>REGISTRO</h1>
                    </div>

                    <div className={style.accessContainer}>
                        <span className="alert__">{errors.name?.message}</span><br />
                        <input type="text" placeholder="Ingrese su nombre" {...register("name")} />
                    </div>

                    <div className={style.accessContainer}>
                        <span className="alert__">{errors.email?.message}</span><br />
                        <input type="email" placeholder="Ingrese su email" {...register("email")} />
                    </div>

                    <div className={style.accessContainer}>
                        <span className="alert__">{errors.password?.message}</span><br />
                        <input type="password" placeholder="Ingrese su contraseña" {...register("password")} />
                    </div>

                    <div className={style.accessContainer} data-container-btn="true">
                        <Link to="/login"><button data-secondary="true" type="button">Ingresar</button></Link>
                        <button data-primary="true" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;