import React, {useState, useEffect} from "react";
import {Container} from "reactstrap";
import {Row} from 'antd';
import {ESTIMATE_URL} from "../../../index";
import axios from "axios";
import OptRecordForm from "./OptRecordForm";
import {OptTitle} from "../module";


const OptRecord = () => {
    const url = window.location.href.split('/').slice(2);
    const model_name = url[url.length - 3];
    const opt = url[url.length - 2];
    const optStyle = "record";

    const [infos, setInfos] = useState([]);

    useEffect(() => {
        resetState();
    }, []);

    const getRecord = () => {
        axios.get(ESTIMATE_URL + model_name + "/" + opt + "/record").then(response => {
            setInfos(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const resetState = () => {
        getRecord();
    };

    return (
        <Container className="Model-Container">
            <OptTitle model_name={model_name}
                      opt={opt}
                      optStyle={optStyle}/>

            <Row>
                <OptRecordForm infos={infos}
                               resetState={resetState}
                               model_name={model_name}/>
            </Row>
        </Container>
    );
}

export default OptRecord;
