import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import PageLogin from "./components/Login";
import PageSimualdor from "./components/Simulador";

export default function Rota(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLogin />} />
                <Route path="/simulador" element={<PageSimualdor />} />
            </Routes>
        </BrowserRouter>
    );
}