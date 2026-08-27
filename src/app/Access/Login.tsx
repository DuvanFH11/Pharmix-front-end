import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from './access.module.css';
import { login } from "../../services/user.service";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useHandleForm } from "../../hooks/useHandleForms";
import loginSchema, { type LoginSchema } from "../../schemas/user.schema";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const { submitFormLogin, alertMessage, isLoading } = useHandleForm();

    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} state={alertMessage.state} time={alertMessage.time} />}

            <div className="d-flex  flex-column align-items-center justify-content-center vh-100 ">
                <form className={style.access} onSubmit={handleSubmit((data) => { submitFormLogin(login, data) })}>
                    <div className={style.accessContainer}>
                        <h1>INICIO DE SESIÓN</h1>
                    </div>

                    <div className={style.accessContainer}>
                        <span className="alert__">{errors.email?.message}</span><br />
                        <input type="email" placeholder="Ingrese su email" {...register("email")} />
                    </div>

                    <div className={style.accessContainer}>
                        <span className="alert__">{errors.password?.message}</span><br />
                        <input type="password" placeholder="Ingrese su contraseña" {...register("password")} />
                    </div >

                    <div className={style.accessContainer} data-container-btn="true">
                        <button data-primary="true" type="submit">Ingresar</button>
                        {/* <Link to="/"><button data-secondary="true">Regresar</button></Link> */}
                    </div >
                </form >
            </div >
        </>
    )
}

export default Login;