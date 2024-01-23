import React, {useState, useEffect, useContext} from "react";
import {getParams, OptInput, OptTitle} from "../OptParam";
import {Col, Container, Row} from "reactstrap";
import LanguageContext from "../../LanguageContext";
import {Input} from 'antd';
import {
    getSpanInput, getWidthInput,
    replaceOpt, TrainTest, UpperFirst, tran_word,
    getStateValue,
    Trans_Model_Output_Label, Trans_ModelTrain_Input_Label,
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
    const [style, setStyle] = useState("result");
    const [show_who, setShowWho] = useState("");

    const getTruePred = () => {
        const acc = getParams(params);
        axios.get(ESTIMATE_URL + model_name + "/" + opt +
            `/true_pred?train_ratio=${acc['train_ratio']}&data_size=${acc['data_size']}&sm_scale=${acc['sm_scale']}&chunk_name=${acc['chunk_name']}`)
            .then(response => {
                const responseData = response.data;
                setResults(getStateValue(results, responseData));
                setTruePred(responseData.points);
                setShowWho("true_pred");
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getLoss = () => {
        const acc = getParams(params);
        axios.get(ESTIMATE_URL + model_name + "/" + opt +
            `/loss?train_ratio=${acc['train_ratio']}&data_size=${acc['data_size']}&sm_scale=${acc['sm_scale']}&chunk_name=${acc['chunk_name']}`)
            .then(response => {
                const responseData = response.data;
                setLoss(responseData);
                setShowWho("loss");
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        const newParams = [...params];
        newParams[index - 1] = {...newParams[index - 1], value};
        setParams(newParams);
    }

    return (
        <Container>
            <Row>
                <OptTitle model_name={model_name}
                      opt={opt}
                      url={url}
                      style={style}/>
            </Row>

            <Row className="Model-Row">
                <OptInput params={params}
                               opt={opt}
                               la={la}
                               offset={1}
                               handleInputChange={handleInputChange}/>
            </Row>

            <Row className="Model-Row">
                <Col>
                    <button onClick={getTruePred}>Compare</button>
                </Col>
                <Col>
                    {opt !== "test" && <button onClick={getLoss}>Loss</button>}
                </Col>
            </Row>

            <Row>
                <Col>
                    {show_who === "true_pred" && <CompTruePred data={true_pred}/>}
                    {show_who === "loss" && <LossHistory data={loss}
                                                         opt={opt}/>}
                </Col>

                <Col>
                    {show_who === "true_pred" && (
                        Array.from({length: results.length}, (_, index) => index + 1).map((i) => (
                            <Row span={getSpanInput(i, results.length, "train")} key={i}>
                                <label className="ModelResult-Label">
                                    {Trans_Model_Output_Label(la)[results[i - 1]?.name]}</label>
                                <Input className="ModelResult-Input"
                                       type="text"
                                       style={{width: getWidthInput(i, results.length, "train"),}}
                                       name={results[i - 1]?.name}
                                       value={results[i - 1]?.value}/>
                            </Row>
                        ))
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default OptResult;