import { createTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const themes = createTheme({

    components: {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: '10px',
                    padding: '10px',
                    marginBottom: '20px',
                    marginTop: '20px',
                    overflow: 'x-scroll',
                    backgroundColor: '#e2e8f0',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: '#041f50',
                    fontFamily: 'Cinzel',
                    textAlign: 'center'
                },
                body: {
                    color: '#605e5e',
                    textAlign: 'center'
                },
                footer: {
                    color: '#041f50',
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#E2E8F0',
                    borderRadius: '20px',
                }
            }
        },
        MuiSelect: {
            defaultProps: {
                IconComponent: ExpandMoreIcon,
            },
            styleOverrides: {
                select: {
                    fontStyle: 'italic',
                    color: '#041f50',
                },
                icon: {
                    color: '#041f50',
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: '12px',
                    marginTop: '8px', // Separación elegante entre el input y la lista
                    marginBottom: '8px',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.06)', // Sombra suave
                    // border: 'none',
                    color: '#041f50',
                    textAlign: 'left',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '0.95rem',
                    padding: '10px 16px',
                    margin: '4px 8px', // Efecto "burbuja" flotante por opción
                    borderRadius: '8px',
                    fontStyle: 'italic'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    // 1. Quitamos el borde en estado normal
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                        borderBottom: '1px solid #041f50',
                        borderRadius: '0px'
                    },
                    // 2. Evitamos que el borde aparezca al pasar el mouse (Hover)
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                        borderBottom: '1px solid #041f50',
                        borderRadius: '0px'
                    },
                    // 3. Evitamos que el borde aparezca cuando está seleccionado (Focus)
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                        borderBottom: '1px solid #041f50',
                        borderRadius: '0px'
                    },
                },
            },
        },
    }
});

export default themes;