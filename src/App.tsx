import React from 'react';
import Header from "./components/header/Header";
import MainPage from "./components/pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TableParametersInputPage from "./components/pages/TableParametersInputPage";
import InputDataPage from "./components/pages/InputDataPage";
import ResultPage from "./components/pages/ResultPage";
import CompareResultPage from "./components/pages/CompareResultPage";

function App() {
  return (
    <BrowserRouter>
        <div>
            <Header/>
            <Routes>
                <Route path='main' element={<MainPage/>}/>
                <Route path='table-parameters' element={<TableParametersInputPage/>}/>
                <Route path='input-data/:tableParamId' element={<InputDataPage/>}/>
                <Route path='result-page/:inputDataId' element={<ResultPage/>}/>
                <Route path='compare-result/:inputDataId' element={<CompareResultPage/>}/>
            </Routes>
        </div>
    </BrowserRouter>
  )
}
export default App;
