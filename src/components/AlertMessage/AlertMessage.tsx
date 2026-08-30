import { useEffect, useState } from 'react';
import style from './alertMessage.module.css';
export interface AlertProps {
    message: string;
    success: boolean;
    time: number;
}
const AlertMessage = ({ message, success, time }: AlertProps) => {
    const [showTarget, setShowTarget] = useState<string>('target-on');
    useEffect(() => {
        const handleAnimation = () => {
            setTimeout(() => {
                setShowTarget('target-off')
            }, 2000);
            setShowTarget('target-on');
        }
        handleAnimation();
    }, [time]);

    return (
        <>
            <div id="target" className={style.alertMessage} data-open={showTarget} style={{ backgroundColor: success ? 'green' : 'red' }}>
                <p>{message}</p>
            </div >
        </>
    )
}


export default AlertMessage;