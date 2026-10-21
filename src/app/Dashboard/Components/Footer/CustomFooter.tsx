import style from './footer.module.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
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
                        </ul>
                    </div>
                    <div className={style.footerContainer}>
                        <h4>Redes Sociales</h4>
                        <ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <li><a href="https://www.linkedin.com/in/duv%C3%A1n-florez-3348892a3/" target="blanck"><LinkedInIcon /></a></li>
                            <li><a href="https://www.facebook.com/duvan.florez.583527" target="blanck"><FacebookIcon /></a></li>
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