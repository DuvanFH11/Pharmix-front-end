import { createTheme } from '@mui/material/styles';

const themes = createTheme({

    components: {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: '10px',
                    padding: '10px',
                    overflow: 'x-scroll',
                    backgroundColor: '#e2e8f0',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: '#041f50',
                    fontFamily: 'Cinzel'
                },
                body: {
                    color: '#605e5e'
                },
                footer: {
                    color: '#041f50',
                }
            }
        }
    }
});

export default themes;