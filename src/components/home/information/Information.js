import React, {useState, useEffect, useContext} from 'react';
import {Col, Container, Row} from "reactstrap";
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import ModelList from "../list/ModelList";
import LanguageContext from "../../LanguageContext";
import ModelNew from "../edit/ModelNew";
import {Trans_ModelList} from "../utils";
import "./Information.css";
import FeatureList from "../list/FeatureList";

const Information = () => {
    const {la, _} = useContext(LanguageContext);
    const [models, setModels] = useState([]);
    const [features, setFeature] = useState([]);

    useEffect(() => {
        resetState();
    }, []);

    const getModels = async () => {
        await axios.get(ESTIMATE_URL + "models").then(response => {
            setModels(response.data);
        }).catch(error => {
            console.error(error);
        })
    };

    const getFeatures = async () => {
        await axios.get(ESTIMATE_URL + "features").then(response => {
            setFeature(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    const resetState = () => {
        getModels();
        getFeatures();
    };

    return (
        <Container>
            <Row>
                <span className="title-text">{Trans_ModelList(la)['model_info']}</span>
                <Col>
                    <ModelList
                        models={models}
                        resetState={resetState}
                    />
                </Col>
            </Row>

            {/*<Row>*/}
            {/*    <Col>*/}
            {/*        <ModelNew create={true} resetState={resetState}/>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <br/><br/>

            <Row>
                <span className="title-text">{Trans_ModelList(la)['feature_info']}</span>
                <Col>
                    <FeatureList
                        features={features}
                        resetState={resetState}
                    />
                </Col>
            </Row>

        </Container>
    );
}

export default Information;