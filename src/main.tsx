import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import MyApp from './MyApp.tsx';
import { AuthProvider } from './providers/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <MyApp />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode >
)
