import React, {useState, useEffect, useContext} from 'react';
import {Container, Row, Col} from "reactstrap";
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import ModelList from "../list/ModelList";
import LanguageContext from "../../LanguageContext";
import ModelNew from "../new/ModelNew";
import {Trans_ModelList} from "../utils";
import "./Information.css";
import FeatureList from "../list/FeatureList";

const Information = ({}) => {
    const {la, _} = useContext(LanguageContext);
    const [models, setModels] = useState([]);
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        resetState();
    }, []);

    const getModels = () => {
        axios.get(ESTIMATE_URL + "models").then(response => {
            setModels(response.data);
        }).catch(error => {
            console.error(error);
        })
    };

    const getFeatures = () => {
        axios.get(ESTIMATE_URL + "features").then(response => {
            setFeatures(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    const resetState = () => {
        getModels();
        getFeatures();
    };

    return (
        <Container className="Model-Container">
            <h1 style={{textAlign: 'center'}}>
                <span className="Information-Table-Title">{Trans_ModelList(la)['model_info']}</span>
            </h1>
            <Row>
                <Col>
                    <ModelList models={models}
                               resetState={resetState}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModelNew resetState={resetState}/>
                </Col>
            </Row>

            <br/><br/>

            <h1 style={{textAlign: 'center'}}>
                <span className="Information-Table-Title">{Trans_ModelList(la)['feature_info']}</span>
            </h1>
            <Row>
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