import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from "axios";

import MyLayout from "./components/share/MyLayout";
import ReLogin from "./components/home/login/ReLogin";
import Login from "./components/home/login/Login";
import Home from "./components/home/Home";
import Train from "./components/operation/train/Train";
import Test from "./components/operation/test/Test";
import Information from "./components/home/information/Information";
import TrainParam from "./components/operation/train/TrainParam";
import TestParam from "./components/operation/test/TestParam";
import OptResult from "./components/operation/result/OptResult";
import ModelDetail from "./components/home/detail/ModelDetail";
import OptRecord from "./components/operation/record/OptRecord";
import NotFound from "./components/share/error/NotFound";
import LanguageContext from "./components/LanguageContext";
import {getStoredLanguage, arrayEqual, DEFAULT_OPTS} from "./components/func";
import "./App.css";
import {ESTIMATE_URL} from "./index";


function App() {
    const [la, setLa] = useState(getStoredLanguage() || "en");
    const [models, setModels] = useState([]);

    useEffect(() => {
        resetState();
    }, [models]);

    const resetState = () => {
        getModels();
    };

    const getModels = () => {
        axios.get(ESTIMATE_URL + "models").then(response => {
            const data = response.data.map(model => model.name);
            if (!arrayEqual(data, models)) {
                setModels(data);
            }
        }).catch(error => {
            console.error(error);
        })
    };

    return (
        <LanguageContext.Provider value={{la, setLa}}>
            <Router>
                <Routes>
                    <Route path="/home"
                           element={<MyLayout> <ReLogin> <Home/> </ReLogin> </MyLayout>}/>

                    <Route path="/login"
                           element={<Login/>}/>

                    <Route path="/inform"
                           element={<MyLayout> <ReLogin> <Information/> </ReLogin> </MyLayout>}/>

                    <Route path={`/train`}
                           element={<MyLayout> <ReLogin> <Train/> </ReLogin> </MyLayout>}/>

                    <Route path={`/test`}
                           element={<MyLayout> <ReLogin> <Test/> </ReLogin> </MyLayout>}/>

                    {models.map((model, _) => (
                        <Route path={`/${model}/detail`}
                               element={<MyLayout> <ReLogin> <ModelDetail/> </ReLogin> </MyLayout>}/>
                    ))}

                    {models.map((model, _) => (
                        <Route path={`/${model}/train`}
                               element={<MyLayout> <ReLogin> <TrainParam/> </ReLogin> </MyLayout>}/>
                    ))}

                    {models.map((model, _) => (
                        <Route path={`/${model}/test`}
                               element={<MyLayout> <ReLogin> <TestParam/> </ReLogin> </MyLayout>}/>
                    ))}

                    {models.map((model, _) => (
                        DEFAULT_OPTS.map((opt, _) => (
                            <Route path={`/${model}/${opt}/result`}
                                   element={<MyLayout> <ReLogin> <OptResult/> </ReLogin> </MyLayout>}/>
                        ))
                    ))}

                    {models.map((model, _) => (
                        DEFAULT_OPTS.map((opt, _) => (
                            <Route path={`/${model}/${opt}/record`}
                                   element={<MyLayout> <ReLogin> <OptRecord/> </ReLogin> </MyLayout>}/>
                        ))
                    ))}

                    <Route path="*" element={<ReLogin> <NotFound/> </ReLogin>}/>
                </Routes>
            </Router>
        </LanguageContext.Provider>
    );
}

export default App;
