import React, {useEffect, useState, Fragment} from "react";
import {
    OptInput, OptOutput, OptTitle, OptAlert, OptProcess,
} from "../module";
import {Container} from "reactstrap";
import {Row} from 'antd';
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import {
    getStateValue, Trans_OptParam, splitProcess, tranProcess, checkRecord, getParam, getCalTime,
    catStr, getParams, resetResults,
    GUTTER_SIZE, PARAMS_TRAIN, RESULTS_TRAIN_TEST,
} from "../func";
import "../Opt.css";
import "../../Alert.css";
import {catContent, clearProcess, getStoredLanguage} from "../../func";

const TrainParam = () => {
    const la = getStoredLanguage();

    const url = window.location.href.split('/').slice(2);
    const model_name = url[url.length - 2]
    const opt = url[url.length - 1]
    const optStyle = "param";

    const [params, setParams] = useState(PARAMS_TRAIN);
    const [results, setResults] = useState(RESULTS_TRAIN_TEST);
    const [msg, setMsg] = useState("");
    const [status, setStatus] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [process, setProcess] = useState("");
    const [showAlert, setShowAlert] = useState(false);
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


