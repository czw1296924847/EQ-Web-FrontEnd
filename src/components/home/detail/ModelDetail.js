import React, {useState, useEffect, useContext} from "react";
import {Col, Container, Row} from "reactstrap";
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import ModelDetailForm from "./ModelDetailForm";
import LanguageContext from "../../LanguageContext";
import {Trans_ModelList} from "../utils";


const ModelDetail = () => {
    const {la, _} = useContext(LanguageContext);

    const url = window.location.href.split('/').slice(2);
    const model_name = url[url.length - 2];
    const [infos, setInfos] = useState([]);

    useEffect(() => {
        resetState();
    }, []);

    const getDetail = () => {
        axios.get(ESTIMATE_URL + `${model_name}/detail`).then(response => {
            setInfos(response.data);
        }).catch(error => {
            console.error(error);
        });
    };

    const resetState = () => {
        getDetail();
    };

    return (
        <Container>
            <Row>
                <span className="title-text">{model_name}&nbsp;
                    {Trans_ModelList(la)['detail_info']}</span>
                <Col>
                    <ModelDetailForm infos={infos}/>
                </Col>
            </Row>

        </Container>
    )
}

export default ModelDetail;
