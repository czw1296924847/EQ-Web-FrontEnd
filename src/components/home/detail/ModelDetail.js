import React, {useState, useEffect, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {Col, Container, Row} from "reactstrap";
import {Tooltip} from "antd";
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import ModelDetailForm from "./ModelDetailForm";
import LanguageContext from "../../LanguageContext";
import {Trans_ModelList} from "../utils";
import {Trans_OptParam} from "../../operation/utils";
import {UrlButton} from "../../operation/OptParam";
import {DEFAULT_MODELS} from "../../func";


const ModelDetail = () => {
    const {la, _} = useContext(LanguageContext);
    const navigate = useNavigate();

    const url = window.location.href.split('/').slice(2);
    const model_name = url[url.length - 2];
    const [infos, setInfos] = useState([]);
    const isDefaultModel = DEFAULT_MODELS.includes(model_name);

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

    const getModelUrl = (model_name, opt) => {
        navigate(`/${model_name}/${opt}`);
    }

    const getInfoUrl = () => {
        navigate(`/inform`);
    }

    const size = 140;
    const paddingRight = isDefaultModel ? size : 10;

    return (
        <Container>
            <Row>
                <div className="ModelDetail-Title" style={{paddingRight: `${paddingRight}px`}}>
                    <h1 style={{textAlign: 'center', flex: 1}}>
                        <span className="ModelDetail-H1-Model">{model_name} </span>
                        <Tooltip placement={"top"} title={Trans_OptParam(la)['go_info_page']}>
                            <span className="ModelDetail-H1-Model"
                                  onClick={() => getInfoUrl()}>{Trans_ModelList(la)['detail_info']}</span>
                        </Tooltip>
                    </h1>
                    {isDefaultModel && UrlButton(getModelUrl, la, model_name, "test", "ModelDetail-Test-Button", {marginLeft: `-${size}px`})}
                    {isDefaultModel && UrlButton(getModelUrl, la, model_name, "train", "ModelDetail-Train-Button", {marginLeft: `-${size}px`})}
                </div>
                <Col>
                    <ModelDetailForm infos={infos} resetState={resetState}/>
                </Col>
            </Row>

        </Container>
    )
}

export default ModelDetail;
