import React from 'react';
import Header from "./components/Header";
import MainPage from "./components/pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TableParametersInputPage from "./components/pages/TableParametersInputPage";
import InputDataPage from "./components/pages/InputDataPage";

function App() {
  return (
    <BrowserRouter>
        <div>
            <Header/>
            <Routes>
                <Route path='main' element={<MainPage/>}/>
                <Route path='table-parameters/input' element={<TableParametersInputPage/>}/>
                <Route path='table-parameters/input/input-data' element={<InputDataPage/>}/>
            </Routes>
        </div>
    </BrowserRouter>
  )
}
export default App;
