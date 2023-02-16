import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Search from './Search';

function App() {
    return (
        <>

            <BrowserRouter>
                <Routes>

                    <Route path='/' element={ <Home /> } />
                    <Route path='/search' element={ <Search /> } />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App