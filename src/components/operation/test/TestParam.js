import React, {useEffect, useState, useContext} from "react";
import {
    OptInput, OptOutput, OptProcess, OptTitle, OptAlert, GUTTER_SIZE,
} from "../OptParam";
import {Container} from "reactstrap";
import LanguageContext from "../../LanguageContext";
import {Row} from 'antd';
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import {
    getStateValue, Trans_OptParam, checkRecord,
    catStr, getParams, resetResults,
} from "../utils";
import "../Opt.css";
import "../../Alert.css";


const TestParam = () => {
    const {la, _} = useContext(LanguageContext);

    const url = window.location.href.split('/').slice(2);
    const [model_name, setModelName] = useState(url[url.length - 2]);
    const [opt, setOpt] = useState(url[url.length - 1]);
    const [params, setParams] = useState([
        {name: "train_ratio", value: "0.75"},
        {name: "data_size", value: "100"},
        {name: "sm_scale", value: "ml"},
        {name: "chunk_name", value: "chunk2"},
    ]);
    const [results, setResults] = useState([
        {name: "r2", value: ""},
        {name: "rmse", value: ""},
        {name: "e_mean", value: ""},
        {name: "e_std", value: ""},
        {name: "pred", value: ""},
        {name: "true", value: ""},
    ]);
    const [msg, setMsg] = useState("");
    const [status, setStatus] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [process, setProcess] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [optStyle, setOptStyle] = useState("param");

    useEffect(() => {
        resetProcess();
    }, [la]);

    const resetProcess = () => {
        if (status === "") {
            setProcess("");
        } else {
            setProcess('='.repeat(20) + `  ${Trans_OptParam(la)[status]}  ` + "=".repeat(20));
        }
    };

    const testModel = async () => {
        resetResults(results, setResults, setProcess);
        const isRecord = await checkRecord(model_name, opt, params, la);
        if (isRecord) {
            setMsg(Trans_OptParam(la)[`start_${opt}`]);
            setStatus("start");
            setTypeAlert("success");
            setProcess(catStr(Trans_OptParam(la)['start']));
            setShowAlert(true);
            axios.post(ESTIMATE_URL + model_name + "/" + opt, getParams(params))
                .then(response => {
                    const responseData = response.data;
                    setStatus("end");
                    setResults(getStateValue(results, responseData));
                    setProcess(catStr(Trans_OptParam(la)['end']));
                    setShowAlert(false);
                    console.log("Success!");
                })
                .catch(error => {
                    const content = error.response.data.error;
                    let msg = "";
                    if (content === "Is training") {
                        msg = Trans_OptParam(la)['wait_train'];
                    } else if (content === "File not found") {
                        msg = Trans_OptParam(la)['not_found_train'];
                    } else {
                        msg = Trans_OptParam(la)['unknown_error'];
                    }
                    setStatus(`${opt}_error`);
                    setProcess(catStr(Trans_OptParam(la)[`${opt}_error`]));
                    setMsg(msg);
                    setTypeAlert("error");
                    console.error(error);
                });
        }
    }

    const handleInputChange = (value, index) => {
        const newParams = [...params];
        newParams[index - 1] = {...newParams[index - 1], value};
        setParams(newParams);
    }

    return (
        <Container className="Model-Container">
            <OptTitle model_name={model_name}
                      opt={opt}
                      optStyle={optStyle}
                      onClick={testModel}/>
            <Row>
                <span className="Opt-Input-Title">{Trans_OptParam(la)['input_param']}</span>
            </Row>
            <Row className="Opt-Row" gutter={GUTTER_SIZE}>
                <OptInput params={params}
                          opt={opt}
                          la={la}
                          offset={1}
                          onChange={handleInputChange}/>
            </Row>

            <Row className="Opt-Row">
                <OptAlert showAlert={showAlert}
                          msg={msg}
                          typeAlert={typeAlert}
                          setShowAlert={setShowAlert}
                          setStatus={setStatus}
                          setProcess={setProcess}/>
            </Row>

            <Row>
                <OptProcess process={process}
                            la={la}/>
            </Row>

            <Row>
                <span className="Opt-Output-Title">{Trans_OptParam(la)['output_param']}</span>
            </Row>
            <Row className="Opt-Row" gutter={GUTTER_SIZE}>
                <OptOutput results={results}
                           opt={opt}
                           la={la}
                           offset={1}/>
            </Row>
        </Container>
    );
}

export default TestParam;
