import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {Col, Container, Row} from "reactstrap";
import {Tooltip} from "antd";
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import ModelDetailForm from "./ModelDetailForm";
import {Trans_ModelList} from "../func";
import {Trans_OptParam} from "../../operation/func";
import {UrlButton} from "../../operation/module";
import {DEFAULT_MODELS, getStoredLanguage} from "../../func";


const ModelDetail = () => {
    const la = getStoredLanguage();
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
                    {isDefaultModel
                        && <UrlButton getModelUrl={getModelUrl} la={la} model_name={model_name} toPath={"test"}
                                      class_name={"ModelDetail-Test-Button"} style={{marginLeft: `-${size}px`}}/>}
                    {isDefaultModel
                        && <UrlButton getModelUrl={getModelUrl} la={la} model_name={model_name} toPath={"train"}
                                      class_name={"ModelDetail-Train-Button"} style={{marginLeft: `-${size}px`}}/>}
                </div>
                <Col>
                    <ModelDetailForm infos={infos} resetState={resetState}/>
                </Col>
            </Row>

        </Container>
    )
}

export default ModelDetail;
