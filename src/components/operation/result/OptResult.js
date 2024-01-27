import React, {useState, useEffect, useContext} from "react";
import {OptInput, OptTitle, GUTTER_SIZE} from "../OptParam";
import {Container} from "reactstrap";
import LanguageContext from "../../LanguageContext";
import {Row, Col, Input, Alert} from 'antd';
import {
    getWidthInput, Trans_OptResult, getStateValue,
    Trans_Model_Output_Label, isExistRecord, getParams,
} from "../utils";

import axios from "axios";
import CompTruePred from "./CompTruePred";
import {ESTIMATE_URL} from "../../../index";
import LossHistory from "./LossHistory";
import "../Opt.css";
import "./OptResult.css";

const OptResult = () => {
    const {la, _} = useContext(LanguageContext);

    const url = window.location.href.split('/').slice(2);
    const [model_name, setModelName] = useState(url[url.length - 3]);
    const [opt, setOpt] = useState(url[url.length - 2]);
    const [params, setParams] = useState([
        {name: "train_ratio", value: "0.75"},
        {name: "data_size", value: "200000"},
        {name: "sm_scale", value: "ml"},
        {name: "chunk_name", value: "chunk2"},
    ]);
    const [results, setResults] = useState([
        {name: "r2", value: 0},
        {name: "rmse", value: 0},
        {name: "e_mean", value: 0},
        {name: "e_std", value: 0},
    ]);
    const [true_pred, setTruePred] = useState([]);
    const [loss, setLoss] = useState([]);
    const [optStyle, setOptStyle] = useState("result");
    const [show_who, setShowWho] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState("");

    const getComp = async () => {
        setShowWho("");
        const useParams = getParams(params);
        const {train_ratio, data_size, sm_scale, chunk_name} = useParams;
        try {
            if (await isExistRecord(model_name, opt, train_ratio, data_size, sm_scale, chunk_name)) {
                axios.get(ESTIMATE_URL + model_name + "/" + opt +
                    `/true_pred?train_ratio=${useParams['train_ratio']}&data_size=${useParams['data_size']}&sm_scale=${useParams['sm_scale']}&chunk_name=${useParams['chunk_name']}`)
                    .then(response => {
                        const responseData = response.data;
                        setResults(getStateValue(results, responseData));
                        setTruePred(responseData.points);
                        setShowWho("true_pred");
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                setShowAlert(true);
                setMsg(Trans_OptResult(la)[`${opt}_record_not`]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getLoss = async () => {
        setShowWho("");
        const useParams = getParams(params);
        const {train_ratio, data_size, sm_scale, chunk_name} = useParams;
        try {
            if (await isExistRecord(model_name, opt, train_ratio, data_size, sm_scale, chunk_name)) {
                axios.get(ESTIMATE_URL + model_name + "/" + opt +
                    `/loss?train_ratio=${useParams['train_ratio']}&data_size=${useParams['data_size']}&sm_scale=${useParams['sm_scale']}&chunk_name=${useParams['chunk_name']}`)
                    .then(response => {
                        const responseData = response.data;
                        setLoss(responseData);
                        setShowWho("loss");
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                setShowAlert(true);
                setMsg(Trans_OptResult(la)[`${opt}_record_not`]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onClose = () => {
        setShowAlert(false);
        setMsg("");
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
                      getComp={getComp}
                      getLoss={getLoss}/>

            <Row className="Opt-Row" gutter={GUTTER_SIZE}>
                <OptInput params={params}
                          opt={opt}
                          la={la}
                          offset={1}
                          onChange={handleInputChange}/>
            </Row>

            <br/><br/>

            <div className="Opt-Result">
                <Row>
                    <Col style={{marginRight: 40}}>
                        {show_who === "true_pred" && <CompTruePred data={true_pred}/>}
                        {show_who === "loss" && <LossHistory data={loss}/>}
                    </Col>

                    <Col>
                        {show_who === "true_pred" && (
                            Array.from({length: results.length}, (_, index) => index + 1).map((i) => (
                                <Row
                                    // span={getSpanInput(i, results.length, "train")}
                                    key={i}>
                                    <div className="OptResult-Metrics">
                                        <label className="OptResult-Label">
                                            {Trans_Model_Output_Label(la)[results[i - 1]?.name]}</label>
                                        <Input className="OptResult-Input"
                                               type="text"
                                               style={{width: getWidthInput(i, results.length, "train"),}}
                                               name={results[i - 1]?.name}
                                               value={results[i - 1]?.value}/>
                                    </div>
                                </Row>
                            ))
                        )}
                    </Col>
                </Row>

                {showAlert &&
                    <Alert className="OptResult-Alert"
                           message={msg}
                           type="error"
                           showIcon
                           closable
                           onClose={onClose}/>}
            </div>
        </Container>
    );
}

export default OptResult;