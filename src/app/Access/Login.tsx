import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from './access.module.css';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useHandleFormAccess } from "../../hooks/useHandleFormsAccess";
import { useEffect } from "react";
import type { UserLoginSchema } from "../../schemas/user.schema";
import userLoginSchema from "../../schemas/user.schema";

const Login = () => {
    const { submitFormLogin, alertMessage, isLoading } = useHandleFormAccess();
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginSchema>({
        resolver: zodResolver(userLoginSchema)
    });

    useEffect(() => {
        console.log("Se cerró la sesión");
    }, [])

    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <div className="d-flex  flex-column align-items-center justify-content-center vh-100 ">
                <form className={style.access} onSubmit={handleSubmit((data) => { submitFormLogin(data) })}>
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