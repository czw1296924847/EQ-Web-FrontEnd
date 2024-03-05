import React, {useEffect, useState, useContext, Fragment} from "react";
import {
    OptInput, OptOutput, OptTitle, OptAlert, OptProcess,
    GUTTER_SIZE,
} from "../OptParam";
import {Container} from "reactstrap";
import LanguageContext from "../../LanguageContext";
import {Row} from 'antd';
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import {
    getStateValue, Trans_OptParam, splitProcess, tranProcess, checkRecord, getParam, getCalTime,
    catStr, getParams, resetResults,
} from "../utils";
import "../Opt.css";
import "../../Alert.css";
import {catContent, clearProcess, DEFAULT_MODELS} from "../../func";

const TrainParam = () => {
    const {la, _} = useContext(LanguageContext);

    const url = window.location.href.split('/').slice(2);
    const [model_name, setModelName] = useState(url[url.length - 2]);
    const [opt, setOpt] = useState(url[url.length - 1]);
    const [params, setParams] = useState([
        {name: "device", value: "cuda:1"},
        {name: "lr", value: "0.0005"},
        {name: "batch_size", value: "64"},
        {name: "epochs", value: "10"},
        {name: "train_ratio", value: "0.75"},
        {name: "data_size", value: "1000"},
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
    const [isEnd, setIsEnd] = useState(true);

    let interval = null;
    let epoch = 0;
    let end = false;
    let content = "";

    useEffect(() => {
        resetProcess()
    }, [la, isEnd]);

    const resetProcess = () => {
        if (!isEnd && model_name) {
            const data_size = getParam(params, "data_size");
            const sm_scale = getParam(params, "sm_scale");
            interval = setInterval(getProcess, getCalTime(data_size, sm_scale));
            getProcess();
        }
    }

    const getProcess = () => {
        const epochs = getParam(params, "epochs");
        let process = "";
        axios.get(ESTIMATE_URL + `${model_name}` + "/process").then(response => {
            process = splitProcess(response.data);
            if (isEnd) return null;
            if (content === "") {        // start training
                content = catContent(content, catStr(Trans_OptParam(la)['start']));
                setProcess(content);
            } else if (process['epoch'] === `${epochs - 1}` && !end) {      // last epoch in training
                content = catContent(content, tranProcess(process, la))
                content = catContent(content, catStr(Trans_OptParam(la)['end']))
                setProcess(content);
                setIsEnd(true);
                end = true;
                clearInterval(interval);
            } else if (process['epoch'] === `${epoch}` && !end) {     // still in this epoch
                content = catContent(content, tranProcess(process, la))
                setProcess(content);
                epoch = epoch + 1;
            }
        }).catch(error => {
            console.error(error);
        });
    }

    const trainModel = async () => {
        setIsEnd(false);        // Start monitoring the train process
        await clearProcess(model_name);
        // setProcess("");

        resetResults(results, setResults, setProcess);
        const isRecord = await checkRecord(model_name, opt, params, la);
        if (isRecord) {
            setMsg(Trans_OptParam(la)[`start_${opt}`]);
            setStatus("start");
            setTypeAlert("success");
            setShowAlert(true);

            axios.post(ESTIMATE_URL + model_name + "/" + opt, getParams(params))
                .then(response => {
                    setStatus("end");
                    setResults(getStateValue(results, response.data));

                    setShowAlert(false);
                    console.log("Success!");
                })
                .catch(error => {
                    const content = error.response.data.error;
                    let msg = "";
                    if (content === "Is testing") {             // model is testing
                        msg = Trans_OptParam(la)['wait_test'];
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
                      onClick={trainModel}/>

            <Fragment>
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
            </Fragment>


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
            <Fragment>
                <Row>
                    <span className="Opt-Output-Title">{Trans_OptParam(la)['output_param']}</span>
                </Row>
                <Row className="Opt-Row" gutter={GUTTER_SIZE}>
                    <OptOutput results={results}
                               opt={opt}
                               la={la}
                               offset={1}/>
                </Row>
            </Fragment>
        </Container>
    );
};

export default TrainParam;


