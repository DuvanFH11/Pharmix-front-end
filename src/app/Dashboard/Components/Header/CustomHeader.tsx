
import { useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import style from './header.module.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


const CustomHeader = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleShowMenu = () => {
        setShowMenu(showMenu === true ? false : true);
    }

    return (
        <>
            {<SideMenu isOpen={showMenu} handleClose={() => setShowMenu(false)} />}
            <header className={style.header}>
                <div className={style.headerContainer}>
                    <h1>DISTRIBUIDORA Tleyn</h1>
                </div>
                <div className={style.headerContainer}>
                    <button data-primary="true" onClick={() => { handleShowMenu() }}> <MenuOutlinedIcon /></button>
                </div>
            </header>

        </>
    )
}

export default CustomHeader;