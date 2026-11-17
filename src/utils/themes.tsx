import { createTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const themes = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0f766e',
            light: '#14b8a6',
            dark: '#0b5f59',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#2563eb',
            light: '#60a5fa',
            dark: '#1d4ed8',
            contrastText: '#ffffff'
        },
        success: { main: '#16a34a' },
        warning: { main: '#f59e0b' },
        error: { main: '#dc2626' },
        info: { main: '#0ea5e9' },
        background: {
            default: '#f4f7f9',
            paper: '#ffffff'
        },
        text: {
            primary: '#0f172a',
            secondary: '#64748b',
            disabled: '#94a3b8'
        },
        divider: '#e2e8f0'
    },
    shape: {
        borderRadius: 12
    },
    typography: {
        fontFamily: '"Inter", "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
        h1: { fontFamily: '"IBM Plex Sans", "Inter", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
        h2: { fontFamily: '"IBM Plex Sans", "Inter", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
        h3: { fontFamily: '"IBM Plex Sans", "Inter", sans-serif', fontWeight: 700 },
        h4: { fontFamily: '"IBM Plex Sans", "Inter", sans-serif', fontWeight: 700 },
        h5: { fontFamily: '"IBM Plex Sans", "Inter", sans-serif', fontWeight: 600 },
        h6: { fontFamily: '"IBM Plex Sans", "Inter", sans-serif', fontWeight: 600 },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: 0
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    padding: '8px 18px',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 10
                }
            }
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    margin: '22px 0 8px',
                    '& ul': {
                        gap: 6
                    }
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 10,
                    border: '1px solid #e2e8f0',
                    '&.Mui-selected': {
                        color: '#ffffff',
                        backgroundColor: '#0f766e',
                        borderColor: '#0f766e',
                        '&:hover': {
                            backgroundColor: '#0b5f59'
                        }
                    }
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    padding: '6px 6px 0',
                    margin: '18px 0 8px',
                    overflowX: 'auto',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 16,
                    boxShadow: '0 12px 30px -18px rgba(15, 23, 42, 0.35)'
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    borderCollapse: 'separate',
                    borderSpacing: 0
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '14px 16px',
                    fontFamily: '"Inter", "IBM Plex Sans", system-ui, sans-serif',
                    fontSize: '0.875rem',
                    borderBottom: '1px solid #eef2f7'
                },
                head: {
                    color: '#475569',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    borderTop: 'none'
                },
                body: {
                    color: '#0f172a',
                    textAlign: 'center'
                },
                footer: {
                    color: '#0f766e'
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: 'background-color 180ms ease',
                    '&:hover': {
                        backgroundColor: '#f8fafc'
                    },
                    '&:last-child td': {
                        borderBottom: 0
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    backgroundImage: 'none',
                    borderRadius: 20,
                    boxShadow: '0 30px 80px -30px rgba(15, 23, 42, 0.5)'
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(15, 23, 42, 0.55)',
                    backdropFilter: 'blur(4px)'
                }
            }
        },
        MuiSelect: {
            defaultProps: {
                IconComponent: ExpandMoreIcon
            },
            styleOverrides: {
                select: {
                    width: '100%',
                    color: '#0f172a',
                    fontStyle: 'normal',
                    textAlign: 'left'
                },
                icon: {
                    color: '#64748b'
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    marginTop: 8,
                    marginBottom: 8,
                    color: '#0f172a',
                    textAlign: 'left',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    boxShadow: '0 18px 40px -18px rgba(15, 23, 42, 0.4)'
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    padding: '10px 16px',
                    margin: '2px 6px',
                    fontSize: '0.92rem',
                    fontStyle: 'normal',
                    borderRadius: 8,
                    '&:hover': {
                        backgroundColor: '#f0fdfa'
                    },
                    '&.Mui-selected': {
                        color: '#0f766e',
                        backgroundColor: '#ccfbf1'
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: '#99f6e4'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: '#f8fafc',
                    transition: 'background-color 200ms ease, box-shadow 200ms ease',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e2e8f0',
                        borderWidth: 1
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cbd5e1'
                    },
                    '&.Mui-focused': {
                        backgroundColor: '#ffffff'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0f766e',
                        borderWidth: 2,
                        boxShadow: '0 0 0 4px rgba(15, 118, 110, 0.12)'
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#64748b',
                    '&.Mui-focused': {
                        color: '#0f766e'
                    }
                }
            }
        }
    }
});

export default themes;
