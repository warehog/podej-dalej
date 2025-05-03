import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from "axios";
import Footer from './components/navigation/Footer';
import AdminPage from './components/admin/AdminPage';
import PomocyPage from './components/navigation-pages/PomocyPage';
import Header from './components/navigation/Header';
import { AppContainer } from './components/styled-components';
import './i18n'

function App() {
    if (process.env.NODE_ENV === 'development') {
        axios.defaults.baseURL = 'http://localhost:3001/api';
    } else if (process.env.NODE_ENV === 'production') {
        axios.defaults.baseURL = '/api';
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppContainer>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pomocy" element={<PomocyPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
                </AppContainer>
                <Footer />
            </Router>
        </ThemeProvider>
    );
}

export default App;