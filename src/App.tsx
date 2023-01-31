import React from 'react';
import Header from "./components/header/Header";
import MainPage from "./components/pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TableParametersInputPage from "./components/pages/TableParametersInputPage";
import InputDataPage from "./components/pages/InputDataPage";
import ResultPage from "./components/pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
        <div>
            <Header/>
            <Routes>
                <Route path='main' element={<MainPage/>}/>
                <Route path='table-parameters/input' element={<TableParametersInputPage/>}/>
                <Route path='table-parameters/input/input-data' element={<InputDataPage/>}/>
                <Route path='result-page' element={<ResultPage/>}/>
            </Routes>
        </div>
    </BrowserRouter>
  )
}
export default App;
