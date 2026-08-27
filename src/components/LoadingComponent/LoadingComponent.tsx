import { Backdrop, CircularProgress, Typography } from '@mui/material';
const LoadingComponent = () => {

    return (
        <>
            <Backdrop
                sx={{
                    color: '#fff',
                    // Asegura que esté por encima de modales y barras de navegación
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    flexDirection: 'column',
                    gap: 2,
                    // Agrega un desenfoque sutil al fondo si lo deseas
                    backdropFilter: 'blur(3px)',
                }}
                open={true} // Si es true se muestra y bloquea el body, si es false se oculta [1]
            >
                {/* El Spinner de MUI */}
                <CircularProgress color="inherit" size={50} />

                {/* Texto de carga */}
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Cargando...
                </Typography>
            </Backdrop>
        </>
    )
}

export default LoadingComponent;