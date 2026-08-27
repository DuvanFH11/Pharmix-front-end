import style from './footer.module.css';

const CustomFooter = () => {
    return (
        <>
            <footer className={style.footer}>
                <div className={style.footerContent}>
                    <div className={style.footerContainer}>
                        <h4>Contactos</h4>
                        <ul>
                            <li>duvanfh11@gmail.com</li>
                            <li>(+57) 310 269 2288</li>
                            <li><a href="https://www.linkedin.com/in/duv%C3%A1n-florez-3348892a3/" target="blanck">Linkedin Duván Florez</a></li>
                        </ul>
                    </div>
                </div>
                <div className={style.footerContainer} data-credits="true">
                    <p>Desarrollado por &copy; Duván Florez</p>
                </div>
            </footer>
        </>
    )
}

export default CustomFooter;