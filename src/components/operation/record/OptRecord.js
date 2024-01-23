import React, {Component, useState, useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {TrainTest, UpperFirst, tran_word, replaceOpt} from "../utils";
import {ESTIMATE_URL} from "../../../index";
import axios from "axios";
import OptRecordForm from "./OptRecordForm";
import {OptTitle} from "../OptParam";


const OptRecord = () => {
    const url = window.location.href.split('/').slice(2);
    const [model_name, setModelName] = useState(url[url.length - 3]);
    const [opt, setOpt] = useState(url[url.length - 2]);
    const [infos, setInfos] = useState([]);
    const [style, setStyle] = useState("record");

    useEffect(() => {
        resetState();
    }, []);

    const getRecord = () => {
        axios.get(ESTIMATE_URL + model_name + "/" + opt).then(response => {
            setInfos(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const resetState = () => {
        getRecord();
    };

    return (
        <Container>
            <Row>
                <OptTitle model_name={model_name}
                          opt={opt}
                          url={url}
                          style={style}/>
                <br/><br/><br/><br/>
            </Row>

            <Row>
                <Col>
                    <OptRecordForm infos={infos}
                                   resetState={resetState}
                                   model_name={model_name}/>
                </Col>
            </Row>
        </Container>
    );
}

export default OptRecord;
