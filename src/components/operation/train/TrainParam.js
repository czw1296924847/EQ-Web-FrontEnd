import React, {useEffect, useState, useContext} from "react";
import {
    onCloseAlert, OptInput, OptOutput, OptSituation, OptTitle,
    catStr, getParams, resetResults, resetSituation,
} from "../OptParam";
import {Container} from "reactstrap";
import LanguageContext from "../../LanguageContext";
import {Col, Input, Row, Alert} from 'antd';
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import {checkRecord, getStateValue, Trans_OptParam,} from "../utils";
import "../Opt.css";
import "../../Alert.css";

const TrainParam = () => {
    const {la, _} = useContext(LanguageContext);

    const url = window.location.href.split('/').slice(2);
    const [model_name, setModelName] = useState(url[url.length - 2]);
    const [opt, setOpt] = useState(url[url.length - 1]);
    const [params, setParams] = useState([
        {name: "device", value: "cuda:1"},
        {name: "lr", value: "0.0005"},
        {name: "batch_size", value: "64"},
        {name: "epochs", value: "50"},
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
    const [situation, setSituation] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [style, setStyle] = useState("param");

    useEffect(() => {
        resetSituation(status, setSituation, la);
    }, [la]);

    const trainModel = async () => {
        resetResults(results, setResults, setSituation);
        if (await checkRecord(model_name, opt, params, la)) {
            setMsg(Trans_OptParam(la)[`start_${opt}`]);
            setStatus("start");
            setTypeAlert("success");
            setSituation(catStr(Trans_OptParam(la)['start']));
            setShowAlert(true);
            axios.post(ESTIMATE_URL + model_name + "/" + opt, getParams(params))
                .then(response => {
                    const responseData = response.data;
                    setStatus("end");
                    setResults(getStateValue(results, responseData));
                    setSituation(catStr(Trans_OptParam(la)['end']));
                    setShowAlert(false);
                    console.log("Success!");
                })
                .catch(error => {
                    const content = error.response.data.error;
                    let msg = "";
                    if (content === "Is testing") {
                        msg = Trans_OptParam(la)['wait_test'];
                    } else {
                        msg = Trans_OptParam(la)['unknown_error'];
                    }
                    setStatus(`${opt}_error`);
                    setSituation(catStr(Trans_OptParam(la)[`${opt}_error`]));
                    setMsg(msg);
                    setTypeAlert("error");
                    console.error(error);
                });
        }
    }

    return (
        <Container className="Model-Container">

            <OptTitle model_name={model_name}
                      opt={opt}
                      url={url}
                      style={style}
                      onClick={trainModel}/>

            <Row>
                <span className="Opt-Input-Title">{Trans_OptParam(la)['input_param']}</span>
            </Row>
            <Row className="Model-Row">
                <OptInput params={params}
                          opt={opt}
                          la={la}
                          offset={1}/>
            </Row>

            <Row className="Model-Row">
                <Col>
                    {showAlert &&
                        <Alert className="Opt-Alert"
                               message={msg}
                               type={typeAlert}
                               showIcon
                               closable
                               onClose={(e) => onCloseAlert(e, setShowAlert, setStatus, setSituation)}/>}
                </Col>
            </Row>

            <Row>
                <span className="Opt-Output-Title">{Trans_OptParam(la)['output_param']}</span>
            </Row>
            <Row className="Model-Row">
                <OptOutput results={results}
                           opt={opt}
                           la={la}
                           offset={1}/>
            </Row>

            <Row>
                <OptSituation situation={situation}
                              la={la}/>
            </Row>
        </Container>
    );
};

export default TrainParam;


