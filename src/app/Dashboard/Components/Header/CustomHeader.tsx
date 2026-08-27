
import { useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import style from './header.module.css';
const CustomHeader = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleShowMenu = () => {
        setShowMenu(showMenu === true ? false : true);
    }

    return (
        <>
            {showMenu === true ? <SideMenu isOpen={showMenu} /> : <SideMenu isOpen={null} />}
            <header className={style.header}>
                <div className={style.headerContainer}>
                    <h1>DISTRIBUIDORA Tleyn</h1>
                </div>
                {/* <div className={style.headerContainer}>
                    <input type="search" placeholder="Buscar Elemento" />
                </div> */}
                <div className={style.headerContainer}>
                    <button data-primary="true" onClick={() => { handleShowMenu() }}>|||</button>
                </div>
            </header>

        </>
    )
}

export default CustomHeader;